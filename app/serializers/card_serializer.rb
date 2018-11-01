class CardSerializer < ActiveModel::Serializer
  attributes :id, :term, :sequence

  has_many :definitions
  has_many :masteries
end
