# netflixGPT

# clone project for learning react js with firebase

mkdir netflix_gpt && cd netflix_gpt
npm init -y

npm install react react-dom
npm install -D parcel

mkdir src
mkdir src/components
touch src/index.html src/index.js src/components/App.jsx

index.html-> emmet + js src + div--< root>
index.js -> import app.jsx and create root and render app

package.json -->
remove ->"main": "index.js",
update ->"scripts": {
"start": "parcel src/index.html",
"build": "parcel build src/index.html"
},

npm install react-router-dom@6

index.js ==>
import App from "./components/App";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const browserRouter = createBrowserRouter([
{
path: "/",
element: <App />,
children: [
{
path: "/browse",
element: <Body />,
},
],
},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
<React.StrictMode>
<RouterProvider router={browserRouter} />
</React.StrictMode>
);

App.jsx====>
import { Outlet } from "react-router-dom";
const App = () => {
return (
<>

<Header />
<Outlet />
</>
);
};

for tailwind
npm install parcel
npm install tailwindcss @tailwindcss/postcss

.postcssrc
{
"plugins": {
"@tailwindcss/postcss": {}
}
}

index.css
@import "tailwindcss";

index.html --> <link href="./index.css" type="text/css" rel="stylesheet" />

for firebase
npm install firebase
npm install -g firebase-tools
firebase login
firebase deploy

redux
npm install react-redux
npm install @reduxjs/toolkit

Create a Redux Store
Create a Slice (Reducer + Actions)
Provide the Store
use Redux in Components

onAuthStateChanged act as event handler. at body/app level

controls=0: hides YouTube controls

modestbranding=1: removes YouTube logo

showinfo=0: hides video title (though not always respected anymore)
