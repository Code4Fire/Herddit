class CreatePodcasts < ActiveRecord::Migration[6.1]
  def change
    create_table :albums do |t|
      t.string :name
      t.string :image
      t.string :artist_name
      t.string :category
      t.text :summary
      t.integer :rating
      t.belongs_to :user

      t.timestamps
    end
  end
end
