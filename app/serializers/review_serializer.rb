class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :username, :date, :comment, :user_id, :album


end
