class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.string :username
      t.string :date
      t.text :comment
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :album, null: false, foreign_key: true
      # t.string :album
      t.timestamps
    end
  end
end
