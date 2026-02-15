# Create images directory if it doesn't exist
New-Item -ItemType Directory -Force -Path "assets/images"

# Download background images
$images = @{
    "about-bg.jpg" = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&q=80"
    "projects-bg.jpg" = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80"
    "certs-bg.jpg" = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1920&q=80"
    "contact-bg.jpg" = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
}

foreach ($image in $images.GetEnumerator()) {
    $url = $image.Value
    $output = "assets/images/$($image.Key)"
    Write-Host "Downloading $($image.Key)..."
    Invoke-WebRequest -Uri $url -OutFile $output
}

Write-Host "All images downloaded successfully!" 