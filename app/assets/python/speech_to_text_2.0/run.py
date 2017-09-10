import os
import json
from os.path import join, dirname
from dotenv import load_dotenv
from watson_developer_cloud import SpeechToTextV1 as SpeechToText

from speech_sentiment_python.recorder import Recorder


FINALS = []

def transcribe_audio(path_to_audio_file):
    username = os.environ.get("BLUEMIX_USERNAME")
    password = os.environ.get("BLUEMIX_PASSWORD")
    # print username
    # print password


    speech_to_text = SpeechToText(username=username,
                                  password=password)

    with open(join(dirname(__file__), path_to_audio_file), 'rb') as audio_file:
        # print audio_file
        text = speech_to_text.recognize(audio_file, content_type='audio/wav', continuous=True,
                                    timestamps=False, max_alternatives=1)
        # print text
        return text


def main():
    recorder = Recorder("app/assets/python/speech_to_text_2.0/speech.wav")

    # print("Recording!\n")
    recorder.record_to_file()

    # print("Transcribing audio....\n")
    result = transcribe_audio('speech.wav')

    data = result
    len(data["results"])
    if "results" in data:
        for shard in data["results"]:
            # print "appending"
            FINALS.append(shard)

    transcript = "<br>".join([x['alternatives'][0]['transcript']
                          for x in FINALS])
    print(transcript + "\n")

    # text = result['results'][0]['alternatives'][0]['transcript']
    # print("Text: " + text + "\n")


if __name__ == '__main__':
    dotenv_path = join(dirname(__file__), '.env')
    load_dotenv(dotenv_path)
    try:
        main()
    except:
        print("IOError detected, exiting...")
        #main()