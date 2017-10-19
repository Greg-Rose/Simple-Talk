class Api::V1::TranscriptsController < ApplicationController
  def create
    temp_audio_file_path = params["recording"].tempfile.path
    output = %x(python lib/python/speech_to_text_2.1/run.py "#{temp_audio_file_path}")
    transcripts = JSON.parse(output)
    original = transcripts["original"]
    simple = transcripts["simple"]

    if current_user
      new_transcript = Transcript.new
      new_transcript.user = current_user
      new_transcript.audio_file = params["recording"].tempfile
      new_transcript.original = original
      new_transcript.simplified = simple
      new_transcript.save
    end

    render json: {
      original: render_transcript(original),
      simplified: render_transcript(simple)
    }, status: :created
  end

  private

  def render_transcript(transcript)
    ApplicationController.render(partial: 'transcripts/transcript', locals: { transcript: transcript })
  end
end
