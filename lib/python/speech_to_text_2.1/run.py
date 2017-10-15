import os
import json
from os.path import join, dirname
from dotenv import load_dotenv
from watson_developer_cloud import SpeechToTextV1 as SpeechToText

import subprocess
from subprocess import Popen, PIPE

import json
import sys

from thesaurus import THESAURUS

FINALS = []

def string_found(string1, string2):
   string1 = " " + string1.strip() + " "
   string2 = " " + string2.strip() + " "
   return string2.find(string1) != -1


def find_and_replace(text):
    newtext  = str(text)
    for word in THESAURUS.keys():
        if string_found(word, str(text)):
            newtext = newtext.replace(word, THESAURUS[word])

    return newtext

def transcribe_audio(path_to_audio_file):
    username = os.environ.get("BLUEMIX_USERNAME")
    password = os.environ.get("BLUEMIX_PASSWORD")

    command = 'curl --user ' + username + ':' + password +' -X POST -H "Content-Type: audio/ogg;codecs=opus" --header "Transfer-Encoding: chunked" --data-binary @' + path_to_audio_file + ' "https://stream.watsonplatform.net/speech-to-text/api/v1/recognize?continuous=true&model=en-US_BroadbandModel&customization_id=0a96a2d0-adf0-11e7-991d-ab5f78b86dad"'

    process = Popen(command, stderr = PIPE, stdout = PIPE, shell= True)
    stdout, stderr = process.communicate()
    text = json.loads(stdout)

    return text


def main():
	result = transcribe_audio(sys.argv[1])

	data = result
	len(data["results"])
	if "results" in data:
	    for shard in data["results"]:
	        FINALS.append(shard)

	transcript = "<br>".join([x['alternatives'][0]['transcript']
	                      for x in FINALS])

	clean_transcript = "".join([x['alternatives'][0]['transcript']
	                      for x in FINALS])

	simple = find_and_replace(clean_transcript)

	output = {"original": transcript, "simple": simple}

	print(json.dumps(output))


if __name__ == '__main__':
    dotenv_path = join(dirname(__file__), '.env')
    load_dotenv(dotenv_path)
    main()
