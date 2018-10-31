class DefinitionTitleSerializer < ActiveModel::Serializer
  attributes :id, :title

  # def :title
  #   object.title.order("title")
  # end
end
