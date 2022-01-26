class Review < ApplicationRecord
    belongs_to :album
    belongs_to :user 
    
    validates :comment, presence: true
    validates :username, presence: true
    validates :date, presence: true
end
