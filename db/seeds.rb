# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Podcast.destroy_all
User.destroy_all
Review.destroy_all

puts "seeding"


u1 = User.create(email: "chettt@gmail.com", password: "password" )
u2 = User.create(email: "tamtiffany89@gmail.com", password: "123" )
u3 = User.create(email: "daddydom@gmail.com", password: "babydom" )

p1 = Podcast.create(name: "Don't act your age", image: "https://edit.org/photos/img/blog/lin-podcast-cover-micro-circle-colors.jpg-840.jpg", artist_name:"Tiffany", category: "Lifestyle", summary: "Staying youthful is to be youthful- listen to the daily rant of Tiffany after drinking from the fountain of youth", rating: "5", user: u2)
p2 = Podcast.create(name: "BabyDom in the City", image: "https://edit.org/photos/img/blog/lin-podcast-cover-micro-circle-colors.jpg-840.jpg", artist_name:"Dominick", category: "Lifestyle", summary: "Audible documentary on the life in a day of Dominick", rating: "3", user: u3 )

c1 = Review.create(username: "chettt", date: "July 4 2020", comment: "Great work, sounds great", user: u1, podcast: p2)
c2 = Review.create(username: "chettt", date: "July 4 2020", comment: "Hilarious, great subject content", user: u1, podcast: p1)
c3 = Review.create(username: "tiff", date: "January 27, 2020", comment: "If you have insomnia, check this podcast out!", user: u2, podcast: p2)
c4 = Review.create(username: "dominick", date: "January 28, 2020", comment: "sounds okay, check out my podcast", user: u3, podcast: p1)

puts "done"