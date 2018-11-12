require 'spec_helper'
RSpec.describe Deck, type: :model do
  describe "Deck model" do
    it { should have_valid(:name).when("Numbers") }
    it { should_not have_valid(:name).when(nil, "") }

    deck_title = FactoryBot.create(:definition_title)
    it { should have_valid(:definition_title).when(deck_title) }
    it { should_not have_valid(:definition_title).when(nil, nil) }
  end
end
