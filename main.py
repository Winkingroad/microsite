import tkinter as tk
import math
import random

class Ball:
    def __init__(self, x, y, vx, vy, radius=8, color='blue'):
        self.x = x
        self.y = y
        self.vx = vx
        self.vy = vy
        self.radius = radius
        self.color = color
        self.id = None
        self.mass = radius / 4  # Mass proportional to radius
        self.bounce_damping = 0.85  # Energy loss on bounce
        self.trail = []  # For motion trails
        self.max_trail = 8

    def move(self, gravity=0.15, friction=0.998):
        # Apply gravity
        self.vy += gravity
        
        # Apply friction
        self.vx *= friction
        self.vy *= friction
        
        # Update trail
        self.trail.append((self.x, self.y))
        if len(self.trail) > self.max_trail:
            self.trail.pop(0)
        
        # Move
        self.x += self.vx
        self.y += self.vy

    def bounce_off_circle(self, cx, cy, cr):
        dx = self.x - cx
        dy = self.y - cy
        dist = math.sqrt(dx ** 2 + dy ** 2)
        
        if dist + self.radius >= cr:
            if dist > 0:
                # Normal vector
                nx = dx / dist
                ny = dy / dist
                
                # Velocity component along normal
                dot = self.vx * nx + self.vy * ny
                
                # Reflect velocity with damping
                self.vx -= 2 * dot * nx
                self.vy -= 2 * dot * ny
                
                # Apply bounce damping
                self.vx *= self.bounce_damping
                self.vy *= self.bounce_damping
                
                # Add some randomness to prevent repetitive bouncing
                self.vx += random.uniform(-0.3, 0.3)
                self.vy += random.uniform(-0.3, 0.3)
                
                # Push ball away from boundary
                overlap = (dist + self.radius) - cr
                self.x -= overlap * nx
                self.y -= overlap * ny

class BallGame:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("🎮 Enhanced Bouncing Ball Escape Game")
        self.root.geometry("850x750")
        self.root.configure(bg='#2c3e50')
        self.root.resizable(False, False)

        # Game settings
        self.radius = 150
        self.cx = 300
        self.cy = 300
        self.balls = []
        self.score = 0
        self.running = False
        self.speed = 16  # ms for smoother animation
        
        # Circle rotation
        self.circle_angle = 0
        self.circle_rotation_speed = 1.5  # degrees per frame
        self.gap_start_angle = 45  # Starting angle of the gap
        self.gap_end_angle = 135   # Ending angle of the gap
        
        # Physics settings
        self.gravity_enabled = True
        self.show_trails = True

        self.setup_ui()
        self.add_ball()
        self.game_loop()

    def setup_ui(self):
        title = tk.Label(self.root, text="🎮 Enhanced Bouncing Ball Escape Game 🎮",
                         font=("Arial", 20, "bold"), bg='#2c3e50', fg='white')
        title.pack(pady=10)

        controls = tk.Frame(self.root, bg='#2c3e50')
        controls.pack(pady=5)

        self.start_btn = tk.Button(controls, text="▶️ Start", command=self.start,
                                   bg='#27ae60', fg='white', font=("Arial", 12, "bold"),
                                   padx=20, pady=5)
        self.start_btn.pack(side=tk.LEFT, padx=5)

        self.stop_btn = tk.Button(controls, text="⏸️ Stop", command=self.stop,
                                  bg='#e74c3c', fg='white', font=("Arial", 12, "bold"),
                                  padx=20, pady=5)
        self.stop_btn.pack(side=tk.LEFT, padx=5)

        self.reset_btn = tk.Button(controls, text="🔄 Reset", command=self.reset,
                                   bg='#f39c12', fg='white', font=("Arial", 12, "bold"),
                                   padx=20, pady=5)
        self.reset_btn.pack(side=tk.LEFT, padx=5)

        # Physics controls
        physics_frame = tk.Frame(self.root, bg='#2c3e50')
        physics_frame.pack(pady=5)

        self.gravity_btn = tk.Button(physics_frame, text="🌍 Gravity: ON", 
                                     command=self.toggle_gravity,
                                     bg='#3498db', fg='white', font=("Arial", 10, "bold"),
                                     padx=15, pady=3)
        self.gravity_btn.pack(side=tk.LEFT, padx=5)

        self.trails_btn = tk.Button(physics_frame, text="✨ Trails: ON", 
                                    command=self.toggle_trails,
                                    bg='#9b59b6', fg='white', font=("Arial", 10, "bold"),
                                    padx=15, pady=3)
        self.trails_btn.pack(side=tk.LEFT, padx=5)

        # Speed control
        speed_frame = tk.Frame(physics_frame, bg='#2c3e50')
        speed_frame.pack(side=tk.LEFT, padx=10)
        
        tk.Label(speed_frame, text="Rotation Speed:", bg='#2c3e50', fg='white', 
                font=("Arial", 9)).pack()
        
        self.speed_scale = tk.Scale(speed_frame, from_=0.5, to=5.0, resolution=0.5,
                                    orient=tk.HORIZONTAL, bg='#34495e', fg='white',
                                    length=100, command=self.update_rotation_speed)
        self.speed_scale.set(self.circle_rotation_speed)
        self.speed_scale.pack()

        info = tk.Frame(self.root, bg='#2c3e50')
        info.pack(pady=5)

        self.score_label = tk.Label(info, text="Score: 0", font=("Arial", 14, "bold"),
                                    bg='#34495e', fg='white', padx=15, pady=5)
        self.score_label.pack(side=tk.LEFT, padx=10)

        self.balls_label = tk.Label(info, text="Balls: 1", font=("Arial", 14, "bold"),
                                    bg='#34495e', fg='white', padx=15, pady=5)
        self.balls_label.pack(side=tk.LEFT, padx=10)

        self.angle_label = tk.Label(info, text="Gap Angle: 45°", font=("Arial", 12),
                                    bg='#34495e', fg='#ecf0f1', padx=15, pady=5)
        self.angle_label.pack(side=tk.LEFT, padx=10)

        self.canvas = tk.Canvas(self.root, width=600, height=600,
                                bg='#1a1a1a', highlightthickness=2,
                                highlightbackground='#34495e')
        self.canvas.pack(pady=10)

        tk.Label(self.root,
                 text="🎯 Rotating circle with realistic physics • 🚪 Red gap moves around • ➕ Each escape adds 3 new balls!",
                 font=("Arial", 10), bg='#2c3e50', fg='#bdc3c7').pack(pady=5)

    def toggle_gravity(self):
        self.gravity_enabled = not self.gravity_enabled
        text = "🌍 Gravity: ON" if self.gravity_enabled else "🌍 Gravity: OFF"
        color = '#3498db' if self.gravity_enabled else '#7f8c8d'
        self.gravity_btn.config(text=text, bg=color)

    def toggle_trails(self):
        self.show_trails = not self.show_trails
        text = "✨ Trails: ON" if self.show_trails else "✨ Trails: OFF"
        color = '#9b59b6' if self.show_trails else '#7f8c8d'
        self.trails_btn.config(text=text, bg=color)

    def update_rotation_speed(self, value):
        self.circle_rotation_speed = float(value)

    def get_current_gap_angles(self):
        """Get current gap angles considering rotation"""
        start = (self.gap_start_angle + self.circle_angle) % 360
        end = (self.gap_end_angle + self.circle_angle) % 360
        return start, end

    def draw_circle(self):
        self.canvas.delete("circle")
        
        # Draw main circle arc (avoiding the gap)
        start_angle = (135 + self.circle_angle) % 360
        self.canvas.create_arc(self.cx - self.radius, self.cy - self.radius,
                               self.cx + self.radius, self.cy + self.radius,
                               start=start_angle, extent=270, style='arc', width=8,
                               outline='#3498db', tags="circle")

        # Draw gap markers
        gap_start, gap_end = self.get_current_gap_angles()
        for angle_deg in [gap_start, gap_end]:
            rad = math.radians(angle_deg)
            x1 = self.cx + (self.radius - 20) * math.cos(rad)
            y1 = self.cy - (self.radius - 20) * math.sin(rad)
            x2 = self.cx + (self.radius + 20) * math.cos(rad)
            y2 = self.cy - (self.radius + 20) * math.sin(rad)
            self.canvas.create_line(x1, y1, x2, y2, fill='#e74c3c', width=10, tags="circle")

        # Draw escape indicator
        gap_mid = (gap_start + gap_end) / 2
        if gap_end < gap_start:  # Handle wrap around
            gap_mid = ((gap_start + gap_end + 360) / 2) % 360
        
        rad = math.radians(gap_mid)
        text_x = self.cx + (self.radius + 40) * math.cos(rad)
        text_y = self.cy - (self.radius + 40) * math.sin(rad)
        
        self.canvas.create_text(text_x, text_y, text="ESCAPE",
                                font=("Arial", 14, "bold"), fill='#e74c3c', tags="circle")
        
        # Update angle display
        self.angle_label.config(text=f"Gap Angle: {int(gap_start)}°-{int(gap_end)}°")

    def add_ball(self, count=1):
        colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12',
                  '#9b59b6', '#1abc9c', '#e67e22', '#ff6b6b', '#4ecdc4', '#45b7d1']
        for _ in range(count):
            angle = random.uniform(0, 2 * math.pi)
            r = random.uniform(30, self.radius - 40)
            x = self.cx + r * math.cos(angle)
            y = self.cy + r * math.sin(angle)
            
            # More varied initial velocities
            speed = random.uniform(2, 6)
            direction = random.uniform(0, 2 * math.pi)
            vx = speed * math.cos(direction)
            vy = speed * math.sin(direction)
            
            # Varied ball sizes
            radius = random.uniform(6, 12)
            color = random.choice(colors)
            self.balls.append(Ball(x, y, vx, vy, radius=radius, color=color))

    def is_in_escape_gap(self, ball):
        """Check if ball is in the current escape gap"""
        dx = ball.x - self.cx
        dy = ball.y - self.cy
        distance = math.sqrt(dx ** 2 + dy ** 2)
        
        # Calculate angle
        angle = math.degrees(math.atan2(-dy, dx)) % 360
        
        # Get current gap position
        gap_start, gap_end = self.get_current_gap_angles()
        
        # Check if ball is near boundary and in gap
        is_near_boundary = distance + ball.radius >= self.radius - 8
        
        # Handle angle wrap-around
        if gap_end < gap_start:  # Gap crosses 0 degrees
            is_in_gap = angle >= gap_start or angle <= gap_end
        else:
            is_in_gap = gap_start <= angle <= gap_end
        
        return is_near_boundary and is_in_gap

    def update_physics(self):
        if not self.running:
            return

        # Rotate circle
        self.circle_angle = (self.circle_angle + self.circle_rotation_speed) % 360

        escaped_indices = []
        gravity = 0.15 if self.gravity_enabled else 0

        for i, ball in enumerate(self.balls):
            ball.move(gravity=gravity, friction=0.9985)

            dx = ball.x - self.cx
            dy = ball.y - self.cy
            distance = math.sqrt(dx ** 2 + dy ** 2)

            # Check for escape BEFORE bouncing
            if self.is_in_escape_gap(ball):
                if distance + ball.radius > self.radius + 15:
                    escaped_indices.append(i)
                    self.score += 1
                    self.add_ball(3)
                    continue
            else:
                # Normal bouncing
                ball.bounce_off_circle(self.cx, self.cy, self.radius)

            # Keep balls within canvas bounds (safety net)
            if ball.x < ball.radius or ball.x > 600 - ball.radius:
                ball.vx *= -0.8
                ball.x = max(ball.radius, min(600 - ball.radius, ball.x))
            if ball.y < ball.radius or ball.y > 600 - ball.radius:
                ball.vy *= -0.8
                ball.y = max(ball.radius, min(600 - ball.radius, ball.y))

        # Remove escaped balls
        for i in reversed(escaped_indices):
            if self.balls[i].id:
                self.canvas.delete(self.balls[i].id)
            del self.balls[i]

        self.score_label.config(text=f"Score: {self.score}")
        self.balls_label.config(text=f"Balls: {len(self.balls)}")

    def draw_balls(self):
        self.canvas.delete("ball")
        self.canvas.delete("trail")
        
        for ball in self.balls:
            # Draw trails
            if self.show_trails and len(ball.trail) > 1:
                for i in range(len(ball.trail) - 1):
                    alpha = (i + 1) / len(ball.trail)
                    x1, y1 = ball.trail[i]
                    x2, y2 = ball.trail[i + 1]
                    width = max(1, int(alpha * 3))
                    # Create gradient effect with multiple lines
                    self.canvas.create_line(x1, y1, x2, y2, 
                                          fill='#3498db', width=width, 
                                          tags="trail")

            # Draw ball with glow effect
            glow_radius = ball.radius + 3
            x1, y1 = ball.x - glow_radius, ball.y - glow_radius
            x2, y2 = ball.x + glow_radius, ball.y + glow_radius
            self.canvas.create_oval(x1, y1, x2, y2,
                                    fill='', outline=ball.color, width=1,
                                    tags="ball")
            
            # Main ball
            x1, y1 = ball.x - ball.radius, ball.y - ball.radius
            x2, y2 = ball.x + ball.radius, ball.y + ball.radius
            ball.id = self.canvas.create_oval(x1, y1, x2, y2,
                                              fill=ball.color, outline='white',
                                              width=2, tags="ball")
            
            # Add highlight for 3D effect
            highlight_x = ball.x - ball.radius * 0.3
            highlight_y = ball.y - ball.radius * 0.3
            highlight_r = ball.radius * 0.3
            self.canvas.create_oval(highlight_x - highlight_r, highlight_y - highlight_r,
                                    highlight_x + highlight_r, highlight_y + highlight_r,
                                    fill='white', outline='', tags="ball")

    def game_loop(self):
        self.draw_circle()
        self.update_physics()
        self.draw_balls()
        self.root.after(self.speed, self.game_loop)

    def start(self):
        self.running = True
        self.start_btn.config(state='disabled')
        self.stop_btn.config(state='normal')

    def stop(self):
        self.running = False
        self.start_btn.config(state='normal')
        self.stop_btn.config(state='disabled')

    def reset(self):
        self.running = False
        self.balls = []
        self.score = 0
        self.circle_angle = 0
        self.canvas.delete("ball")
        self.canvas.delete("trail")
        self.add_ball()
        self.score_label.config(text="Score: 0")
        self.balls_label.config(text="Balls: 1")
        self.start_btn.config(state='normal')
        self.stop_btn.config(state='disabled')

    def run(self):
        self.root.mainloop()

# Launch the game
if __name__ == "__main__":
    print("Launching enhanced game...")
    BallGame().run()