import re
with open('index.html') as h:
    templateCode:str=h.read()
matches=re.findall(r'{{\w+.js}}',templateCode)
for match in matches:
    with open(match.strip(r"{}")) as f:
        scriptCode=f.read()
    templateCode= templateCode.replace(match,scriptCode)

with open("activity.html","w") as writer:
    writer.write(templateCode)