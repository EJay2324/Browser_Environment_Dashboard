  <script>
    const canvas = document.getElementById("circleCanvas");
    const ctx = canvas.getContext("2d");

    let circles = [];
    let selectedCircle = null;
    let isDragging = false;

    canvas.addEventListener("mousedown", function (e) {
      const { offsetX, offsetY } = e;
      selectedCircle = null;
      for (let i = circles.length - 1; i >= 0; i--) {
        const c = circles[i];
        const dx = offsetX - c.x;
        const dy = offsetY - c.y;
        if (Math.sqrt(dx * dx + dy * dy) < c.radius) {
          selectedCircle = c;
          break;
        }
      }
      if (!selectedCircle) {
        circles.push({ x: offsetX, y: offsetY, radius: 20, selected: false });
      } else {
        selectedCircle.selected = true;
        isDragging = true;
      }
      circles.forEach(c => { if (c !== selectedCircle) c.selected = false; });
      draw();
    });

    canvas.addEventListener("mousemove", function (e) {
      if (isDragging && selectedCircle) {
        selectedCircle.x = e.offsetX;
        selectedCircle.y = e.offsetY;
        draw();
      }
    });

    canvas.addEventListener("mouseup", function () {
      isDragging = false;
    });

    canvas.addEventListener("wheel", function (e) {
      if (selectedCircle) {
        e.preventDefault();
        selectedCircle.radius += e.deltaY < 0 ? 2 : -2;
        if (selectedCircle.radius < 5) selectedCircle.radius = 5;
        draw();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Delete" && selectedCircle) {
        circles = circles.filter(c => c !== selectedCircle);
        selectedCircle = null;
        draw();
      }
    });

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      circles.forEach(c => {
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
        ctx.fillStyle = c.selected ? "red" : "blue";
        ctx.fill();
        ctx.closePath();
      });
    }
  </script>
</body>
</html>