**1** Aufbau nach SMACSS
=============================

*	**Base**  
	grundlegende Stile für Basis-HTML-Elemente
*	**Layout**  
	der strukturelle Grundaufbau der Seite
*	**Module**  
	wiederverwendbare, modulare Bestandteile der Seite
*	**State**  
	zustandsabhängige Darstellungen


**1.1** Base – Regeln für atomare Elemente
------------------------------------------

In den Basisregeln wird den atomaren HTML-Elementen eine grundlegende Darstellung zugewiesen. Diese Regeln beinhalten z.B. die Typografie der Seite, Link-Stile oder den Body-Hintergrund. Es sollten hier ausschliesslich Selektoren verwendet werden, die direkt HTML-Elemente ansprechen, also Element-, Attribut-, Kind- oder Geschwisterselektoren, aber auch Pseudoklassen.

	h1 { … }
	h2 { … }
	p, li { – }
	p:first-letter { – }
	h1 span { – }
	a { – }


**1.2** Layout – Grundstruktur
------------------------------

Im Layout wird die Grundstruktur der Seite definiert. Seitenelemente wie der Seitenkopf und der Seitenfuss, die Navigation, der eigentliche Inhaltsbereich oder die Sidebar sind hier zu finden. 

Layout-Stile sollten im Normalfall nur über einfache Selektoren zugewiesen werden, also direkt über Klassen- oder ID-Selektoren.

	#article { … }
	#sidebar { … }

In einigen Fällen kann es aber notwendig sein, kontextabhängige Stile zuzuweisen, dann können die Selektoren auch aus kombinierten Selektoren bestehen.

	.layout-fixed #article { … }
	.layout-fixed #sidebar { … }

ID-Selektoren sollten im Übrigen möglichst vermieden werden, wenn es nur um die Zuweisung von Stilen geht. Der Performance-Unterschied zwischen ID- und Klassen-Selektoren beim Parsen durch den Browser ist minimal, die potenziellen Probleme in Bezug auf die Spezifität der Selektoren dagegen sind enorm. In vielen Fällen ist es sinnvoller, Klassen-Selektoren statt ID-Selektoren zu verwenden, vor Allem im Hinblick auf die Wiederverwendbarkeit der Stile.

Als Einstiegspunkte für Javascript sind IDs allerdings eine gute Wahl, da so nicht das gesamt DOM nach Elementen durchsucht werden muss.


**1.3** Module – wiederverwendbare Bestandteile
-----------------------------------------------

Module beinhalten den größten Anteil der Stile einer Webseite. Sie fügen sich in die Bestandteile des Layouts ein und tragen damit den Löwenanteil zur gesamten Seite bei. Module sitzen meist direkt innerhalb des Layouts, können aber auch innerhalb von anderen Modulen vorkommen. Sie sollten als eigenständige Objekte in der Seite geplant werden, wodurch sie (problemlos) wiederverwendbar sind und auch in unterschiedlichen Kontexten (z.B. sowohl im Inhaltsbereich und in der Sidebar) eingesetzt werden können.

Für Module sollten möglichst nur Klassenselektoren verwendet werden, alleine schon im Hinblick auf eine mögliche mehrfache Verwendung innerhalb einer Seite. Aber auch für die interne Struktur eines Moduls sollten Elementselektoren nur dann eingesetzt werden, wenn die interne Struktur eines Moduls von vornherein klar definiert ist und HTML-Elemente innerhalb des Moduls nur für einen bestimmten Zweck verwendet werden. Andernfalls wird die Wiederverwendbarkeit eines Moduls durch zu spezifische Selektoren stark eingeschränkt.

	<div class="folder">
		<span>Folder Name</span>
		<span>(32 Items)</span>
	</div>

In diesem Fall wäre ein Elementselektor wie `.folder span` ein Problem, daher sollten in diesem Fall Klassen verwendet werden.

	<div class="folder">
		<span class="folder-name">Folder Name</span>
		<span class="folder-items">(32 Items)</span>
	</div>

ID-Selektoren verbieten sich in Modulen alleine schon durch die Wiederverwendung der Module. Um ein Modul in einer bestimmten Instanz 

Wenn sehr viele Module definiert werden, sollten diese Module entsprechend auch auf mehrere Dateien verteilt werden.


**1.4** State – statusabhängige Regeln
--------------------------------------

### (versteckt, eingeklappt, aktiv, selektiert, etc.) ###

Statusabhängige Regeln überschreiben meist alle anderen Regeln, um ihren „speziellen“ Status abzubilden: z.B. die Darstellung eines aktiven Menupunkts überschreibt die normalen Stile des Menupunktes. Diese Regeln werden meist dem selben Element zugewiesen wie layout- oder modulbezogene Regeln, daher sollten sie auch nur aus einzelnen Klassenselektoren bestehen. Da ein Objekt in der Seite normalerweise nur einen Status gleichzeitig haben kann (oder sollte), ist es meist kein Problem – und oft sogar sinnvoll – _!important-Regeln_ zu verwenden.



**2** Allgemeines
=================


**2.1** CSS-Resets
------------------

Ein CSS-Reset oder CSS-Normalize setzt browserübergreifend die Grundlagen für die anschliessende Umsetzung des Layouts. Sämtliche Basis-Stile werden dabei für alle Browser auf die gleichen Grundwerte gesetzt. Beim CSS-Reset werden allerdings viele typografische Stile auf einen „Nullwert“ gesetzt und müssen anschliessend oft noch einmal, nämlich auf die finalen Werte gesetzt werden, die im Design definiert sind. Beim CSS-Normalize werden dagegen die finalen Werte aus dem Design direkt gesetzt, weswegen es dem „stupiden“ CSS-Reset vorzuziehen ist.


**2.2** Namensgebung von Selektoren
-----------------------------------

Eine konsistente Namensvergabe für Klassen und IDs ist wichtig. Durch eine sinnvolle Vergabe der Klassennamen sollte gleich auf den ersten Blick erkennbar sein, welchen Sinn und Zweck ein HTML-Baustein hat. Hierbei sollte natürlich eine sementische Namensvergabe bevorzugt werden und es sollten keine Farb-, Positions- oder ähnliche, rein optische Angaben als Klassennamen verwendet werden. Einzige Ausnahmen sind „generische“ Breitenangaben wie `narrow`, `large` – bei Rasterbasierten Layouts auch `columns3` oder Ähnliches – oder statusabhängige Angaben wie `is-visible` oder `is-hidden`.

Durch die Unterteilung in die unter **Punkt 1.1** definierten Bereiche können Klassennamen – und analog natürlich auch die entsprechenden Selektoren – über Prefixe direkt den vier Bereichen zugeordnet werden. Da die Base-Stile direkt über Tag-Selektoren zugewiesen werden, ist ein Prefix hierfür nicht notwendig. Layout-Stile sollten aber einen Prefix bekommen, der sie als Layout-Stil erkennbar macht.

	.layout-grid {
	    float: left;
	}
	
	.state-error {
	    color: #f00;
	    background-color: #fee;
	}
	
	.state-hidden {
	    position: absolute;
	    left: -999em;
	}


**2.3** Aufbau von Selektoren im Hinblick auf deren Anwendbarkeit (und Wiederverwendbarkeit)
--------------------------------------------------------------------------------------------

CSS greift über Selektoren auf HTML-Elemente bzw. Konstrukte zu. Diese Selektoren sollten möglichst unabhängig von der zugrundeliegenden HTML-Struktur definiert werden. Dadurch erhöhen sich die Flexibilität und die Wiederverwendbarkeit von Modulen bzw. deren Markup-Konstrukten und den ihnen zugewiesenen Stilen.

HTML ist in einer Baumstruktur mit Nachfahren und Vorfahren aufgebaut, ähnlich eines Stammbaums. Je mehr dieser „Generationen“ durch einen Selektor betroffen sind, desto stärker ist der Selektor vom HTML-Aufbau abhängig. Und umso spezifischer und unflexibler ist er in Bezug auf eine mögliche Wiederverwendbarkeit an anderen Stellen der Website oder mit einem etwas anderen Aufbau der Inhalte.

Eine Konsequenz hieraus ist es, ruhig `class`-Attribute für Kindelemente von Modulen zu vergeben, um diesen Kindelementen unabhängig vom konkreten Markup Style-Angaben zuweisen zu können.

Nehmen wir als Beispiel die folgenden beiden HTML-Schnipsel

	<div class="mod-cb">
		<h2 class="mod-cb-header">…</h2>
		<p class="mod-cb-content">…</p>
	</div>

und

	<div class="mod-cb">
		<header class="mod-cb-header">
			<h1>…</h1>
			<div>…</div>
		</header>
		<div class="mod-cb-content">
			…
		</p>
	</div>

sowie die beiden Stylesheet-Blöcke

	.mod-cb h2 {…}
	.mod-cb p {…}

und

	.mod-cb {…}
	.mod-cb-header {…}
	.mod-cb-content {…}

.

Beide HTML-Schnipsel definieren ein HTML-Modul `mod-cb` für einen Inhaltsblock, in dem jeweils ein Header- und ein Inhaltsbereich definiert werden. Das konkrete Markup der Header- und Inhaltsbereiche unterscheidet sich allerdings in beiden HTML-Schnipseln.

Die Selektoren im ersten Stylesheet-Block funktionieren zwar beim ersten HTML-Schnipsel, greifen aber beim zweiten HTML-Schnipsel nicht, weil sie auf HTML-Elemente angewiesen sind, die dort nicht vorhanden sind (die Elemente `h2` und `p`).

Die Selektoren im zweiten Stylesheet-Block bestehen dagegen ausschließlich aus Klassen-Selektoren und funktionieren daher unabhängig vom konkreten Markup. Sie greifen also sowohl beim ersten HTML-Schnipsel als auch beim zweiten HTML-Schnipsel und machen dadurch die Verwendung des Moduls deutlich flexibler.



**3** Pre-Prozessoren für CSS
=============================

Pre-Prozessoren wie SASS oder LESS sind in den meisten Fällen nicht notwendig. Viele angebliche Vorteile von Preprozessoren sind vollkommen überflüssig und verleiten eher zu schlechtem Code. Auch Variablen werden sehr überbewertet. Für Schriftgrößen sollte es eh nicht notwendig sein, dutzende verschiedene Angaben quer durch das Stylesheet zu definieren. Und für Farben können Variablen auch eher nur in Ausnahmefällen sinnvoll eingesetzt werden. Siehe hierzu auch ["The problem with CSS pre-processors"](http://blog.millermedeiros.com/2011/11/the-problem-with-css-pre-processors/). Sehr problematisch sind `@extends`, die komplette Anweisungsblöcke in einen Anweisungsblock übernehmen und somit Code duplizieren – zwar nicht in der Produktionsdatei, aber sehr wohl in der kompilierten, an den Browser ausgelieferten Datei. Einzig Mixins mit Parametern können sinnvoll sein, um z.B. alle browserspezifischen Variationen von `border-radius: 3px;` mit allen Prefixen auszugeben.

In einem grundlegenden Punkt sind Pre-Prozessoren allerdings recht nützlich, nämlich für die Verwaltung der Stylesheet. Dadurch ist es mit geringem Aufwand möglich, die Stylesheets einerseits während der Entwicklung auf mehrere Dateien aufteilen zu können, andererseits dem Browser aber nur eine, zusammengefasste Datei auszuliefern. Hierfür ist es notwendig, die Stylesheets während der Bearbeitung zu überwachen und nach dem Abspeichern zu kompilieren. ["Codekit"](http://incident57.com/codekit/) hat sich hierfür als recht passable Möglichkeit erpuppt.



**4** responsive Design
=======================

Wenn vom Kunden auch die Unterstützung von mobilen Geräten – die meist deutlich kleinere Screens haben – gewünscht wird, kommt – als Weiterentwicklung von flexiblen oder fluiden Layouts – responsive Design zum Einsatz. Hierbei werden für bestimmte Screenbreiten mehrere, an die jeweilige Screenbreite angepasste Layouts umgesetzt. Als erstes sollte das Layout für die kleinste Screenbreite aufgebaut werden (mobile first), um im Anschluss mit Anpassungen für größere Screens erweitert zu werden (progressive enhancement). Der Vorteil hiervon ist



**5** Aufbau der Stylesheets
============================


**5.1** Aufteilung auf Dateiebene
---------------------------------

Auf der Dateiebene teilen sich die Stylesheets in zwei Bereiche auf: `partials` und `styles`, für die jeweils ein Verzeichnis existiert. Im Verzeichnis `partials` befinden sich alle „globalen“ Dateien wie ein Reset-Stylesheet oder Helper wie z.B. ein `clearfix`. Auch ein eventuell vorhandenes Print-Stylesheet liegt hier.

Im Verzeichnis `styles` liegen die eigentlichen Style-Angaben, nach SMACSS aufgeteilt in die vier Dateien `base`, `layout`, `module` und `state`.

In der Datei `all` im Root-Verzeichnis werden sowohl die globalen Dateien aus dem Verzeichnis `partials` als auch die Stylesheets aus dem Verzeichnis `styles` eingebunden. Durch die Kompilierung mit SASS werden so alle Teil-Stylesheets in einem einzigen resultierenden Stylesheet `all.css` zusammengefasst.

	all.scss
	partials/
		_helper.scss
		_reset.scss
		_webfonts.scss
		print.scss
	styles/
		base.scss
		layout.scss
		module.scss
		state.scss


### **5.1.1** Aufteilung des Stylesheets in mehrere Dateien ###

Wenn die Website für mobile Geräte optimiert ist, ist es bei umfangreichen Stylesheets meist sinnvoll, das Stylesheet auf mehrere Dateien aufzuteilen. Diese werden später im HTML über media queries eingebunden und nur den Endgeräten ausgespielt, auf die die entsprechende media query greift. Dadurch wird erreicht, dass auch nur Style-Angaben ausgeliefert werden, die von dem Endgerät auch wirklich verarbeiten werden. Besonders auf mobilen Endgeräten, die potentiell keine schnelle Datenverbindung haben, verringert sich so das zu übertragende Datenvolumen.

Der Aufbau der Stylesheets bleibt grundsätzlich der Gleiche. Die Dateien `base`, `layout`, `module` und `state` existieren hierbei allerdings mehrfach. Für jedes der aus der Kompilierung durch SASS entstehenden Stylesheets gibt es eine eigene, mit einem Prefix versehene, Version dieser Dateien. Dieses Prefix zeigt an, unter welchen Bedingungen das jeweilige Stylesheet ausgeliefert wird, also z.B. `mobile-base` für mobile Endgeräte oder `desktop-layout` für Desktops. Wenn ein Stylesheet Style-Angaben für alle Endgeräte enthält, lautet dessen Prefix `all-`.

Auch in dieser Variante liegt im Root-Verzeichnis eine Datei `all`, in der alle Teil-Stylesheets per `@import`-Regel eingebunden werden. Zusätzlich liegt dort aber für jeden weiteren Prefix noch eine weitere Datei, die ihrerseits alle entsprechenden Dateien im Verzeichnis `styles`, die denselben Prefix enthalten, per `@import` einbindet. Durch die Kompilierung mit SASS entstehen so mehrere Stylesheet-Dateien, einmal die Datei `all` und für jeden Prefix eine weitere Stylesheet-Datei mit dem Namen des Prefixes, z.B. `desktop` oder `mobile`.

Die globalen Dateien wie z.B. `reset` werden in dieser Variante im Stylesheet `all` eingebunden, damit sie in allen Endgeräten vorhanden sind.

	all.scss
	desktop.scss
	partials/
		_helper.scss
		_reset.scss
		_webfonts.scss
		print.scss
	styles/
		all-base.scss
		all-layout.scss
		all-module.scss
		all-state.scss
		desktop-base.scss
		desktop-layout.scss
		desktop-module.scss
		desktop-state.scss



**6** Dokumentation der Stylesheets
===================================

Alle Stylesheets sind zu dokumentieren. Jede einzelne Stylesheet-Datei enthält hierfür einen Dokumentations-Block am Anfang der Datei. Zusätzlich wird vor jedem Codeblock kurz zusammengefasst, was im folgenden Codeblock definiert wird.


**6.1** Dokumentations-Block am Anfang der Datei
------------------------------------------------


### **6.1.1** mögliche Angaben ###

#### Projekt – _@project_ ####
Zu welchem Projekt gehört die Datei

#### Projekt-URL – _@url_ ####
Unter welcher URL ist das Projekt erreichbar

#### Autor – _@author_ ####
Von wem wurde die Datei erstellt

#### Datum der letzten Änderung – _@date_ ####
Wann wurde die Datei zum letzten Mal geändert

#### Dateiname _@filename_ ####
Der Dateiname des Stylesheets

##### Inhalt _@content_ ####
Der Inhalt der Datei

#### Beschreibung _@description_ ####
Eine kurze Beschreibung des Inhalts der Stylesheet-Datei


### **6.1.2** Beispiel ###

	/**
	 * @project				Sven Lalla Friseurmeister
	 * @url					http://www.svenlalla.de
	 * @author				Sascha Quasthoff <sascha@quasthoff.de>
	 * @date				2011-12-13
	 * @filename			base.css
	 * @content				Base
	 * @description			grundlegende Basisstile für alle Endgeräte
	 */


**6.2** Dokumentation eines Codeblocks
--------------------------------------


### **6.2.1** mögliche Angaben ###

#### Inhalt _@content_ ####
Der Inhalt des Codeblocks

#### Beschreibung _@description_ ####
eine kurze Beschreibung des Inhalts des Codeblocks


### **6.2.2** Beispiel ###

	/**
	 * @content				Base > Headlines
	 * @description			Überschriften
	 */



**7** Browserunterstützung
==========================

Welche Browser unterstützt werden, hängt in erster Linie vom Projekt und dessen Zielgruppe ab. Gibt es eine vorhandene Nutzerbasis, die womöglich sehr alte Browser verwenden?
