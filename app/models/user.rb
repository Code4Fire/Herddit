class User < ApplicationRecord
    has_many :albums, dependent: :destroy
    has_many :reviews, through: :albums

    has_secure_password
end
