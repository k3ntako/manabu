class UserNote < ApplicationRecord
  validates :owner, presence: true, inclusion: { in: [ true, false ] }
  
  belongs_to :note
  belongs_to :user
end
