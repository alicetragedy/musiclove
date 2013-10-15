App = Ember.Application.create();

App.Artist = Ember.Object.extend({
	name: null,

	slug: function() {
		return this.get('name').dasherize();
	}.property('name'),

	songs: function() {
		return App.Songs.filterProperty('artist', this.get('name'));
	}.property('name', 'App.Songs.@each.artist')
});

App.Song = Ember.Object.extend({
	title: null,
	rating: null,
	artist: null
});

var artistNames = ['Jeff Buckley', 'Volcano Choir', 'Bon Iver', 'Zola Jesus', 'New Order', 'Joy Division']
App.Artists = artistNames.map(function(name) {return App.Artist.create({name: name}); })

App.Songs = Ember.A();

// Volcano Choir Songs
App.Songs.pushObject(App.Song.create({title: 'Comrade', artist: 'Volcano Choir', rating: 7}));
App.Songs.pushObject(App.Song.create({title: 'Tiderays', artist: 'Volcano Choir', rating: 7}));


// Bon Iver Songs
App.Songs.pushObject(App.Song.create({title: 'Skinny Love', artist: 'Bon Iver', rating: 7}));
App.Songs.pushObject(App.Song.create({title: 'Blood Bank', artist: 'Bon Iver', rating: 7}));
App.Songs.pushObject(App.Song.create({title: 'Perth', artist: 'Bon Iver', rating: 7}));

//New Order Songs
App.Songs.pushObject(App.Song.create({title: 'Bizarre Love Triangle', artist: 'New Order', rating: 7}));

//Zola Jesus Songs
App.Songs.pushObject(App.Song.create({title: 'Skin', artist: 'Zola Jesus', rating: 7}));
App.Songs.pushObject(App.Song.create({title: 'Night', artist: 'Zola Jesus', rating: 7}));
App.Songs.pushObject(App.Song.create({title: 'Trust Me', artist: 'Zola Jesus', rating: 7}));
App.Songs.pushObject(App.Song.create({title: 'Lick The Palm Of The Burning Handshake', artist: 'Zola Jesus', rating: 7}));

// Joy Division Songs
App.Songs.pushObject(App.Song.create({title: 'Love Will Tear Us Apart', artist: 'Joy Division', rating: 7}));



App.Router.map(function() {
  this.resource('artists', function() {
  	this.route('songs', { path: ':slug' });
  });
});

App.IndexRoute = Ember.Route.extend({
	beforeModel: function() {
		this.transitionTo('artists');
	}
});

App.ArtistsRoute = Ember.Route.extend ({
	model: function() {
		return App.Artists;
	},
	actions: {
		createArtist: function() {
			var name = this.get('controller').get('newArtist');
			var artist = App.Artist.create({ name: name});
			App.Artists.pushObject(artist);
			this.get('controller').set('newArtist', '');
		}
	}
});

App.ArtistsSongsRoute = Ember.Route.extend ({
	model: function(params) {
		return App.Artists.findProperty('slug', params.slug);
	},
	actions: {
		createSong: function() {
			var title = this.get('controller.newSong');
			var artist = this.get('controller.model.name');

			var song = App.Song.create({ title: title, artist: artist});
			App.Songs.pushObject(song);
			this.get('controller').set('newSong', '');
		}
	}
});


