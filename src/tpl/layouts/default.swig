<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="utf-8">
    <title>{{ title }}</title>
    {% if _dev %}
        <link rel="stylesheet" href="css/style.css">
    {% else %}
        <link rel="stylesheet" href="css/style.min.css">
    {% endif %}
</head>
<body>
    <div class="main">
        <h1>{{ title }}</h1>

        {% block content %}{% endblock %}
    </div>

    {% if _dev %}
        <script src="js/app-compiled.js"></script>
    {% else %}
        <script src="js/app-compiled.min.js"></script>
    {% endif %}
    <script>
        var config = {};
        app.start(config);
    </script>
</body>
</html>