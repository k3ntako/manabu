require 'spec_helper'
RSpec.describe UserNote, type: :model do
  describe "UserNote model" do
    user = FactoryBot.create(:user)
    it { should have_valid(:user).when(user) }
    it { should_not have_valid(:user).when(nil, nil) }

    note = FactoryBot.create(:note)
    it { should have_valid(:note).when(note) }
    it { should_not have_valid(:note).when(nil, nil) }
  end
end
