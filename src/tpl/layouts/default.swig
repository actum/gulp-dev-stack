<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="utf-8">
    <title>{{ title }}</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="main">
        <h1>{{ title }}</h1>

        {% block content %}{% endblock %}
    </div>

    <script src="js/app.js"></script>
    <script>
        var config = {};
        app.start(config);
    </script>
</body>
</html>