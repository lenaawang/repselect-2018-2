import App from './App.html';
import io from 'socket.io-client';
import pym from 'pym.js';

// Set up the responsive iframe
const pymChild = new pym.Child({ renderCallback: () => { console.log('pym!');}, polling: 500 });
pymChild.sendHeight();

/*
 * Retirement planning
 * Once the live blog is no longer used create a json file the exports the full
 * object. Import it here and pass it into the app startup.
 * You might want to remove the socket dependency after this
 */
const appData = {
	newData: false,
	hasConnection: false,
	colors: {
	  "Grassroots": "#81c784",
	  "Independent": "#fff176",
	  "Labor": "#e57373",
	  "Liberals": "#42a5f5",
	  "Mod Libs": "#4fc3f7",
	  "NLS": "#a1887f",
	  "SLS": "#ffb74d",
	  "Socialist Alternative": "#9575cd",
	  "Solidarity": "#f06292",
	  "Unity": "#7986cb",
	  "Mint": "#71d39d",
	  "Heat": "#ff4c3f",
	  "Blank": "#eeeeee"
	},
	results: {
		blog: [
			{
				heading: 'Loading',
				meta: 'Right damn now',
				body: '<p>Loading</p>',
				published: '1',
				important: '',
			},
		],
		copy: [{
			title: 'default',
			displayresults: '0',
		}],
		council: [
			{ faction: 'surprise' }
		],
		honi: [
			{
			},
			{
			},
			{
			},
			{
			},
			{
			},
			{
			},
			{
			},
			{
			},
			{
				mint: '1',
				heat: '1',
			},
			{
				mint: '1',
				heat: '1',
			},
			{
				mint: '1',
				heat: '1',
			},
			{
				mint: '1234',
				heat: '2345',
			},
		],
		nus: [],
		pres: [
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{
				pytka: '1',
				pytkapercent: '0.5',
				grant: '1',
				grantpercent: '0.5',
				ma: '1',
				maapercent: '0.5',
				informal: '1',
				informalpercent: '0.5',
			},
		]
	},
};

window.app = new App({
	target: document.body,
	// Pass data from the static file in here when the app is retired
	data: appData,
});

window.app.on('sendTheHeight', event => {
	pymChild.sendHeight();
});

// When any new data is received it's passed down the component chain
const socket = io('repselect-2018-2.herokuapp.com');

socket.on('data', function(data){
	window.app.set({'hasConnection': true});
	window.app.set({'results': data});
	window.app.set({'newData': true});
	console.log(data);
});
