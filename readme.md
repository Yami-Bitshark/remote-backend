# Github trending repos


This simple application, let you quickly get:
  - The 25 trending repos on GitHub
  - The 100 most rated repos on GitHub
  - Insights about the frameworks used.

# Why only 25 trending repos?

Since the Github API doesn't provide a way to get the trending repos, I had to scrape their trending page [https://github.com/trending].

Also, the API doesn't give a way to get insights about the interactions on a repo during a period of time, so I couldn't make my own trending algorithm from it.

### Installation

This Application requires [Node.js](https://nodejs.org/) v6+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd remote-backend
$ npm install
$ node app
or
$ npm start
```
You can also also run it via Docker:
```
$ docker build -t remote/api .
then after build
$ docker run -d -p 8000:8080 --restart="always" remote/api
```
### API
trending endpoints:
##### /trending/listall  : get 25 trending repos (As explained earlier, there is no way to get 100 repos)
##### /trending/listlang?lang=Language : get 25 trending repos for a given language/framework (See at the end of the Readme for the possible languages)
##### /trending/analytics : Get an array of the used languages, and how many times they were used. The array is sorted by language popularity.

most rated endpoints:

##### /mrated/listall  : get 100 top rated repos
##### /mrated/listlang?lang=Language : get 100 trending repos for a given language/framework
##### /mrated/analytics : Get an array of the used languages, and how many times they were used. The array is sorted by language popularity.

Author: Tarik Moustaid

Accepted languages:
"html
javascript
python
c
c++
shell
unknown languages
1c enterprise
abap
abnf
actionscript
ada
adobe font metrics
agda
ags script
alloy
alpine abuild
altium designer
ampl
angelscript
ant build system
antlr
apacheconf
apex
api blueprint
apl
apollo guidance computer
applescript
arc
asciidoc
asn.1
asp
aspectj
assembly
asymptote
ats
augeas
autohotkey
autoit
awk
ballerina
batchfile
befunge
bibtex
bison
bitbake
blade
blitzbasic
blitzmax
bluespec
boo
brainfuck
brightscript
zeek
c
c#
c++
c-objdump
c2hs haskell
cabal config
cap'n proto
cartocss
ceylon
chapel
charity
chuck
cirru
clarion
clean
click
clips
clojure
closure templates
cloud firestore security rules
cmake
cobol
coffeescript
coldfusion
coldfusion cfc
collada
common lisp
common workflow language
component pascal
conll-u
cool
coq
cpp-objdump
creole
crystal
cson
csound
csound document
csound score
css
csv
cuda
curl config
cweb
cycript
cython
d
d-objdump
darcs patch
dart
dataweave
desktop
dhall
diff
digital command language
dircolors
directx 3d file
dm
dns zone
dockerfile
dogescript
dtrace
dylan
e
eagle
easybuild
ebnf
ec
ecere projects
ecl
eclipse
editorconfig
edje data collection
edn
eiffel
ejs
elixir
elm
emacs lisp
emberscript
eml
eq
erlang
f#
f*
factor
fancy
fantom
figlet font
filebench wml
filterscript
fish
flux
formatted
forth
fortran
freemarker
frege
g-code
game maker language
gaml
gams
gap
gcc machine description
gdb
gdscript
genie
genshi
gentoo ebuild
gentoo eclass
gerber image
gettext catalog
gherkin
git attributes
git config
glsl
glyph
glyph bitmap distribution format
gn
gnuplot
go
golo
gosu
grace
gradle
grammatical framework
graph modeling language
graphql
graphviz (dot)
groovy
groovy server pages
hack
haml
handlebars
haproxy
harbour
haskell
haxe
hcl
hiveql
hlsl
holyc
html
html+django
html+ecr
html+eex
html+erb
html+php
html+razor
http
hxml
hy
hyphy
idl
idris
ignore list
igor pro
inform 7
ini
inno setup
io
ioke
irc log
isabelle
isabelle root
j
jasmin
java
java properties
java server pages
javascript
javascript+erb
jflex
jison
jison lex
jolie
json
json with comments
json5
jsoniq
jsonld
jsonnet
jsx
julia
jupyter notebook
kicad layout
kicad legacy layout
kicad schematic
kit
kotlin
krl
labview
lasso
latte
lean
less
lex
lfe
lilypond
limbo
linker script
linux kernel module
liquid
literate agda
literate coffeescript
literate haskell
livescript
llvm
logos
logtalk
lolcode
lookml
loomscript
lsl
ltspice symbol
lua
m
m4
m4sugar
makefile
mako
markdown
marko
mask
mathematica
matlab
maven pom
max
maxscript
mcfunction
mediawiki
mercury
meson
metal
minid
mirah
mirc script
mlir
modelica
modula-2
modula-3
module management system
monkey
moocode
moonscript
motorola 68k assembly
mql4
mql5
mtml
muf
mupad
muse
myghty
nanorc
ncl
nearley
nemerle
nesc
netlinx
netlinx+erb
netlogo
newlisp
nextflow
nginx
nim
ninja
nit
nix
nl
npm config
nsis
nu
numpy
objdump
objective-c
objective-c++
objective-j
objectscript
ocaml
omgrofl
ooc
opa
opal
open policy agent
opencl
openedge abl
openrc runscript
openscad
openstep property list
opentype feature file
org
ox
oxygene
oz
p4
pan
papyrus
parrot
parrot assembly
parrot internal representation
pascal
pawn
pep8
perl
perl 6
php
pic
pickle
picolisp
piglatin
pike
plpgsql
plsql
pod
pod 6
pogoscript
pony
postcss
postscript
pov-ray sdl
powerbuilder
powershell
prisma
processing
proguard
prolog
propeller spin
protocol buffer
public key
pug
puppet
pure data
purebasic
purescript
python
python console
python traceback
q
qmake
qml
quake
r
racket
ragel
raml
rascal
raw token data
rdoc
readline config
realbasic
reason
rebol
red
redcode
regular expression
ren'py
renderscript
restructuredtext
rexx
rhtml
rich text format
ring
riot
rmarkdown
robotframework
roff
roff manpage
rouge
rpc
rpm spec
ruby
runoff
rust
sage
saltstack
sas
sass
scala
scaml
scheme
scilab
scss
sed
self
shaderlab
shell
shellsession
shen
slash
slice
slim
smali
smalltalk
smarty
smpl
smt
solidity
sourcepawn
sparql
spline font database
sqf
sql
sqlpl
squirrel
srecode template
ssh config
stan
standard ml
stata
ston
stylus
subrip text
sugarss
supercollider
svelte
svg
swift
systemverilog
tcl
tcsh
tea
terra
tex
texinfo
text
textile
thrift
ti program
tla
toml
tsql
tsx
turing
turtle
twig
txl
type language
typescript
unified parallel c
unity3d asset
unix assembly
uno
unrealscript
urweb
v
vala
vba
vbscript
vcl
verilog
vhdl
vim script
vim snippet
visual basic .net
visual basic .net
volt
vue
wavefront material
wavefront object
wdl
web ontology language
webassembly
webidl
webvtt
wget config
windows registry entries
wisp
wollok
world of warcraft addon data
x bitmap
x font directory index
x pixmap
x10
xbase
xc
xcompose
xml
xml property list
xojo
xpages
xproc
xquery
xs
xslt
xtend
yacc
yaml
yang
yara
yasnippet
zap
zeek
zenscript
zephir
zig
zil
zimpl"
