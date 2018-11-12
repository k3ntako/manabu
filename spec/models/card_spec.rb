require 'spec_helper'
RSpec.describe Card, type: :model do
  describe "Card model" do
    it { should have_valid(:term).when("One") }
    it { should_not have_valid(:term).when(nil, "") }

    it { should have_valid(:sequence).when(1) }
    it { should_not have_valid(:sequence).when("One") }
    it { should_not have_valid(:sequence).when(nil, "") }

    deck = FactoryBot.create(:deck)
    it { should have_valid(:deck).when(deck) }
    it { should_not have_valid(:deck).when(nil, nil) }
  end
end
