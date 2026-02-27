// Interactive Gradient Canvas - Inspired by Josh W Comeau's website
(function() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Mouse position
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let targetX = mouseX;
    let targetY = mouseY;
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });
    
    // Smooth mouse following
    function lerp(start, end, factor) {
        return start + (end - start) * factor;
    }
    
    // Create gradient blobs
    const blobs = [];
    const blobCount = 3;
    
    for (let i = 0; i < blobCount; i++) {
        blobs.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            radius: 200 + Math.random() * 300,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            targetX: 0,
            targetY: 0
        });
    }
    
    function drawBlob(blob, mouseInfluence) {
        const gradient = ctx.createRadialGradient(
            blob.x, blob.y, 0,
            blob.x, blob.y, blob.radius
        );
        
        const isDark = document.body.getAttribute('data-theme') === 'dark';
        const baseColor = isDark ? '77, 158, 255' : '0, 102, 255';
        
        gradient.addColorStop(0, `rgba(${baseColor}, ${isDark ? 0.15 : 0.12})`);
        gradient.addColorStop(0.5, `rgba(${baseColor}, ${isDark ? 0.08 : 0.06})`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
    }
    
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Smooth mouse position
        mouseX = lerp(mouseX, targetX, 0.05);
        mouseY = lerp(mouseY, targetY, 0.05);
        
        // Update and draw blobs
        blobs.forEach((blob, index) => {
            // Calculate mouse influence
            const dx = mouseX - blob.x;
            const dy = mouseY - blob.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const influence = Math.max(0, 1 - distance / 800);
            
            // Move blob towards mouse with influence
            blob.targetX = blob.x + dx * influence * 0.1;
            blob.targetY = blob.y + dy * influence * 0.1;
            
            // Smooth movement
            blob.x = lerp(blob.x, blob.targetX, 0.02);
            blob.y = lerp(blob.y, blob.targetY, 0.02);
            
            // Add some drift
            blob.x += blob.vx;
            blob.y += blob.vy;
            
            // Bounce off edges
            if (blob.x < 0 || blob.x > canvas.width) blob.vx *= -1;
            if (blob.y < 0 || blob.y > canvas.height) blob.vy *= -1;
            
            // Keep in bounds
            blob.x = Math.max(0, Math.min(canvas.width, blob.x));
            blob.y = Math.max(0, Math.min(canvas.height, blob.y));
            
            // Draw blob
            drawBlob(blob, influence);
        });
        
        animationFrameId = requestAnimationFrame(animate);
    }
    
    // Start animation when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', animate);
    } else {
        animate();
    }
    
    // Handle theme changes
    document.addEventListener('themeChanged', () => {
        // Theme change will be reflected in next frame via drawBlob()
    });
})();
