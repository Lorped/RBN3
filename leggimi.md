npm install --save jquery
npm install --save popper.js
npm install --save bootstrap@next

npm install --save-dev @types/jquery


.angular-cli.json

      "styles": [
		"styles.css",
		"../node_modules/bootstrap/dist/css/bootstrap.min.css"
      ],
      "scripts": [
		"../node_modules/jquery/dist/jquery.min.js",
		"../node_modules/popper.js/dist/umd/popper.min.js",
    	"../node_modules/bootstrap/dist/js/bootstrap.min.js"
	  ],




npm install font-awesome --save

Insert into your style.css

@import '~font-awesome/css/font-awesome.css';

export  NODE_OPTIONS=--openssl-legacy-provider




https://api.openweathermap.org/data/2.5/weather?q=Roma,IT&appid=dace55e43d30c124e29bc999a04871d3&units=metric&lang=it
