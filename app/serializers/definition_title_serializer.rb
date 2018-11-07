class DefinitionTitleSerializer < ActiveModel::Serializer
  attributes :id, :title, :sequence

  # def :title
  #   object.title.order("title")
  # end

  def sequence
    object.definitions.first.sequence
  end
end
