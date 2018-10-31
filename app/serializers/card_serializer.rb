class CardSerializer < ActiveModel::Serializer
  attributes :id, :term

  has_many :definitions
  has_many :masteries
end
