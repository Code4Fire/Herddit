class AlbumSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :artist_name, :category, :summary, :rating


end
