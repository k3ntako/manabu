require 'spec_helper'
RSpec.describe UserDeck, type: :model do
  describe "UserDeck model" do
    user = FactoryBot.create(:user)
    it { should have_valid(:user).when(user) }
    it { should_not have_valid(:user).when(nil, nil) }

    deck = FactoryBot.create(:deck)
    it { should have_valid(:deck).when(deck) }
    it { should_not have_valid(:deck).when(nil, nil) }
  end
end
