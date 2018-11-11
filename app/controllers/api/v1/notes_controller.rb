class Api::V1::NotesController < ApplicationController
  def index
    notes = current_user.notes.order("updated_at DESC")
    if notes.length == 0
      render json: "[]"
    else
      render json: notes
    end
  end

  def show
    if note_show_params[:id] == "new"
      render json: {message: "Creating new note."}
    else
      render json: Note.find(note_show_params[:id])
    end
  end

  def update
    if !example_user?(current_user)
      name = note_params[:name].to_s
      if(name.strip == "")
        name = DateTime.now
        name = name.strftime("%m/%d/%Y %H:%M")
        name = name.to_s + " Notes"
      end

      if Note.exists?(note_params[:note_id])
        note = Note.find(note_params[:note_id])
        note.attributes = {name: name, note: note_params[:note]}
        if note.save
          render json: note
        else
          render json: {error: "Error updating note."}
        end
      else
        note = Note.new(name: name, note: note_params[:note])

        if note.save
          user_note = UserNote.new(user: current_user, owner: true, note: note)
          if user_note.save
            render json: note
          else
            note.destroy
            render json: {error: "Error saving note to user."}
          end
        else
          render json: {error: "Error saving note."}
        end
      end
    end
    render json: {error: "Example user cannot update a note."}
  end

  private

  def note_show_params
    params.permit(:id)
  end

  def note_params
    params.permit(:id, :name, :note, :note_id)
  end
end
