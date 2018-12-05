class User < ApplicationRecord
  validates :email, presence: true
  validates :encrypted_password, presence: true
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :birthday, presence: true
  validates :sign_in_count, presence: true

  mount_uploader :profile_photo, ProfilePhotoUploader

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable

  has_many :masteries
  has_many :user_decks
  has_many :decks, through: :user_decks
  has_many :user_notes
  has_many :notes, through: :user_notes
  has_many :user_reminders
  has_many :reminder_categories, through: :user_reminders
  has_many :reminders, through: :reminder_categories

  def self.get_profile_photo(id, file)
    fog = Fog::Storage.new({
      :provider                 => 'AWS',
      :aws_access_key_id        => ENV["AWS_ACCESS_KEY_ID"],
      :aws_secret_access_key    => ENV["AWS_SECRET_ACCESS_KEY"]
    })

    bucket = fog.directories.get(ENV["S3_BUCKET"])
    bucket.files.get_https_url(file.path, Time.now + 600)
  end

  protected
  def confirmation_required?
    true
  end
end
