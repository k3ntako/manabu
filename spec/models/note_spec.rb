require 'spec_helper'
RSpec.describe Note, type: :model do
  describe "Note model" do
    it { should have_valid(:name).when("Astrophysics") }
    it { should_not have_valid(:name).when(nil, "") }

    it { should have_valid(:note).when('Week 1: Astrophysics is the branch of astronomy that employs the principles of physics and chemistry "to ascertain the nature of the astronomical objects, rather than their positions or motions in space". - Wikipedia') }
    it { should_not have_valid(:note).when(nil, "") }
  end
end
