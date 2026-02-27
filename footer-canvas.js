// Rainbow Canvas for Footer - Adapted from sample
(function() {
    const canvas = document.getElementById('footerCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size - half of browser width, positioned at bottom right
    function resizeCanvas() {
        canvas.width = window.innerWidth / 2;
        canvas.height = 300;
    }
    
    // Rainbow points configuration
    const numArcs = 10;
    const pointSpacing = 20;
    const arcSpacing = 8;
    const pointSize = 6;
    
    // Create points with rainbow arc pattern
    const points = [];
    let centerX = 0;
    let centerY = 0;
    let arcWidth = 0;
    let arcHeight = 0;
    
    // Initialize dimensions
    function initializeDimensions() {
        centerX = canvas.width / 2;
        centerY = canvas.height * 0.5;
        arcWidth = canvas.width * 0.95; // Increased arc length (was 0.85)
        arcHeight = canvas.height * 0.35; // Increased height for more oval shape (was 0.18)
    }
    
    // Mouse position
    let mouseX = 0;
    let mouseY = 0;
    
    // Track mouse movement (relative to canvas)
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });
    
    // Also track mouse position globally for better interaction
    document.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        if (e.clientX >= rect.left && e.clientX <= rect.right && 
            e.clientY >= rect.top && e.clientY <= rect.bottom) {
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        }
    });
    
    // Function to get rainbow color based on layer
    function getRainbowColor(layerIndex, totalLayers) {
        const colorProgress = layerIndex / (totalLayers - 1);
        
        let r, g, b;
        
        if (colorProgress < 0.1667) {
            const t = colorProgress / 0.1667;
            r = 255;
            g = Math.floor(t * 165);
            b = 0;
        } else if (colorProgress < 0.3333) {
            const t = (colorProgress - 0.1667) / 0.1667;
            r = 255;
            g = Math.floor(165 + t * 90);
            b = 0;
        } else if (colorProgress < 0.5) {
            const t = (colorProgress - 0.3333) / 0.1667;
            r = Math.floor(255 - t * 255);
            g = 255;
            b = 0;
        } else if (colorProgress < 0.6667) {
            const t = (colorProgress - 0.5) / 0.1667;
            r = 0;
            g = Math.floor(255 - t * 255);
            b = Math.floor(t * 255);
        } else if (colorProgress < 0.8333) {
            const t = (colorProgress - 0.6667) / 0.1667;
            r = Math.floor(t * 75);
            g = 0;
            b = Math.floor(255 - t * 50);
        } else {
            const t = (colorProgress - 0.8333) / 0.1667;
            r = Math.floor(75 + t * 180);
            g = 0;
            b = Math.floor(205 + t * 50);
        }
        
        return `rgb(${r}, ${g}, ${b})`;
    }
    
    // Initialize points
    function initPoints() {
        points.length = 0;
        const minX = centerX - arcWidth / 2;
        const maxX = centerX + arcWidth / 2;
        
        const uniquePositions = new Map();
        let pointIndex = 0;
        
        for (let i = 0; i < numArcs; i++) {
            const layerOffset = (i - numArcs / 2) * arcSpacing;
            const numPoints = Math.max(2, Math.floor(arcWidth / pointSpacing));
            
            for (let j = 0; j < numPoints; j++) {
                const t = numPoints > 1 ? j / (numPoints - 1) : 0.5;
                
                let baseX = minX + t * arcWidth;
                const normalizedX = (t - 0.5) * 2;
                let baseY = centerY - arcHeight * (1 - normalizedX * normalizedX) + layerOffset;
                
                const uniqueOffset = pointIndex * 0.0001;
                let x = baseX + Math.sin(uniqueOffset) * 0.01;
                let y = baseY + Math.cos(uniqueOffset) * 0.01;
                
                const precision = 10000;
                const posKey = `${Math.round(x * precision)},${Math.round(y * precision)}`;
                
                if (uniquePositions.has(posKey)) {
                    const angle = (pointIndex * 137.508) % 360;
                    const offsetDist = 0.05;
                    x = baseX + Math.cos(angle * Math.PI / 180) * offsetDist;
                    y = baseY + Math.sin(angle * Math.PI / 180) * offsetDist;
                    const newKey = `${Math.round(x * precision)},${Math.round(y * precision)}`;
                    
                    if (uniquePositions.has(newKey)) {
                        x = baseX + (pointIndex % 100) * 0.001;
                        y = baseY + Math.floor(pointIndex / 100) * 0.001;
                    }
                }
                
                const finalKey = `${Math.round(x * precision)},${Math.round(y * precision)}`;
                uniquePositions.set(finalKey, true);
                
                const slope = (4 * arcHeight * normalizedX) / arcWidth;
                const baseAngle = Math.atan(slope);
                
                const color = getRainbowColor(i, numArcs);
                
                points.push({
                    x: x,
                    y: y,
                    baseX: x,
                    baseY: y,
                    baseAngle: baseAngle,
                    color: color,
                    rotation: 0
                });
                
                pointIndex++;
            }
        }
    }
    
    // Initialize dimensions and points
    resizeCanvas();
    initializeDimensions();
    mouseX = canvas.width / 2;
    mouseY = canvas.height / 2;
    initPoints();
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        initializeDimensions();
        mouseX = canvas.width / 2;
        mouseY = canvas.height / 2;
        initPoints();
    });
    
    // Calculate angle from point to mouse
    function angleToMouse(point) {
        const dx = mouseX - point.x;
        const dy = mouseY - point.y;
        return Math.atan2(dy, dx);
    }
    
    // Draw a point (short line segment)
    function drawPoint(x, y, angle, color) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.setLineDash([]);
        
        const halfLength = pointSize;
        const x1 = x - Math.cos(angle) * halfLength;
        const y1 = y - Math.sin(angle) * halfLength;
        const x2 = x + Math.cos(angle) * halfLength;
        const y2 = y + Math.sin(angle) * halfLength;
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
    
    // Track if mouse is on canvas
    let mouseOnCanvas = false;
    canvas.addEventListener('mouseenter', () => {
        mouseOnCanvas = true;
    });
    canvas.addEventListener('mouseleave', () => {
        mouseOnCanvas = false;
    });
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        points.forEach((point) => {
            if (mouseOnCanvas) {
                const targetAngle = angleToMouse(point);
                const angleDiff = targetAngle - point.baseAngle;
                
                let normalizedDiff = angleDiff;
                while (normalizedDiff > Math.PI) normalizedDiff -= 2 * Math.PI;
                while (normalizedDiff < -Math.PI) normalizedDiff += 2 * Math.PI;
                
                point.rotation += (normalizedDiff - point.rotation) * 0.1;
            } else {
                point.rotation *= 0.9;
            }
            
            const currentAngle = point.baseAngle + point.rotation;
            drawPoint(point.x, point.y, currentAngle, point.color);
        });
        
        requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
})();
