# dependencies for browser add-on / extension
# (c) 2018 Authentiq B.V.
# Stan van de Burgt @stannie

IMGFILES=$(wildcard images/*)
FILES=LICENSE README.md background.js options.js options.html

hi:
	@echo "Use: make firefox|chrome|opera"

#all: firefox chrome

firefox: authentiq-firefox-2fa.zip
	@echo Ready for $@: $<
	@echo Console: https://addons.mozilla.org/en-US/developers/addon/authentiq-2fa/edit

authentiq-firefox-2fa.zip: manifest-firefox.json $(FILES) $(IMGFILES)
	cp $< manifest.json
	zip $@ manifest.json $^
	#printf "@ manifest-firefox.json\n@=manifest.json\n" | zipnote -w $@

chrome: authentiq-chrome-2fa.zip
	@echo Ready for $@: $<
	@echo Console: https://chrome.google.com/webstore/developer/dashboard/g03867941375704827632

authentiq-chrome-2fa.zip: manifest-chrome.json $(FILES) $(IMGFILES)
	cp $< manifest.json
	zip $@ manifest.json $^
	#printf "@ manifest-chrome.json\n@=manifest.json\n" | zipnote -w $@

opera: authentiq-opera-2fa.zip
	@echo Ready for $@: $<
	@echo See https://dev.opera.com/extensions/basics/ on how to create a .nex
	@echo Console: https://addons.opera.com/developer/package/233586/

authentiq-opera-2fa.zip: manifest-opera.json $(FILES) $(IMGFILES)
	cp $< manifest.json
	zip $@ manifest.json $^

clean:
	/bin/rm manifest.json authentiq-*-2fa.zip
