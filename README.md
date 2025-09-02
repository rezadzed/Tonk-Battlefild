<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Chosen Palette: Wartime Ember -->
    <!-- Application Structure Plan: A single-page dashboard with a fixed top navigation to scroll to different sections: Overview, Battlefield, Shop, Roadmap, and Technical Info. This structure organizes the user's detailed game plan into logical, thematic chunks, making the complex project easy to explore. The interactive elements in each section (e.g., charts, diagrams) are designed to make the data and concepts more engaging and understandable than a static document. -->
    <!-- Visualization & Content Choices: 
        - Overview: Inform -> Animated Canvas header of a tank -> Engages user immediately -> Vanilla JS Canvas.
        - Battlefield: Organize -> HTML/CSS grid for map layout, interactive diagram for controls -> Visualizes game space and mechanics -> HTML/Tailwind.
        - Shop: Compare/Analyze -> Chart.js bar chart for upgrade cost vs. power, interactive cards for items -> Translates raw numbers into a clear visual comparison -> Chart.js.
        - Roadmap: Organize -> Vertical timeline with clickable phases -> Structures the project plan sequentially -> HTML/Tailwind/JS for interaction.
        - Technical Info: Utility -> Copy-to-clipboard buttons -> Improves usability for key data points -> Vanilla JS.
        -->
    <!-- CONFIRMATION: NO SVG graphics used. NO Mermaid JS used. -->
    <title>Tonk Battlefield Project Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">