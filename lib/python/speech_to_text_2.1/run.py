import os
import json
from os.path import join, dirname
from dotenv import load_dotenv
from watson_developer_cloud import SpeechToTextV1 as SpeechToText

import subprocess
from subprocess import Popen, PIPE

import json
import sys
import urllib

FINALS = []

def create_dict():
	with open("lib/python/speech_to_text_2.1/expanded_thesaurus.txt") as g:
		toreturn = {}

		for line in g.readlines():
			[term, definition] = line.split('\t')
			toreturn[term] = definition.strip()
	return toreturn

def string_found(string1, string2):
   string1 = " " + string1.strip() + " "
   string2 = " " + string2.strip() + " "
   return string2.find(string1) != -1


def find_and_replace(text):
    g = create_dict()
    newtext  = str(text)
    for word in g.keys():
        if string_found(word, str(text)):
            newtext = newtext.replace(word, g[word])

    return newtext

def transcribe_audio(path_to_audio_file):
    username = os.environ.get("BLUEMIX_USERNAME")
    password = os.environ.get("BLUEMIX_PASSWORD")

    urllib.urlretrieve(path_to_audio_file, "tmp/speech.wav")
    command = 'curl --user ' + username + ':' + password +' -X POST -H "Content-Type: audio/wav" --header "Transfer-Encoding: chunked" --data-binary @tmp/speech.wav "https://stream.watsonplatform.net/speech-to-text/api/v1/recognize?continuous=true&model=en-US_BroadbandModel&customization_id=1efecd90-961e-11e7-907e-91c7e8f96686"'

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

	print(transcript)

	f = open("lib/python/speech_to_text_2.1/original.txt", "w")
	f.write(transcript)
	f.close()

	f = open("lib/python/speech_to_text_2.1/simple.txt", "w")
	f.write(simple)
	f.close()


if __name__ == '__main__':
    dotenv_path = join(dirname(__file__), '.env')
    load_dotenv(dotenv_path)
    main()
