<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" exclude-result-prefixes="svg"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:svg="http://www.w3.org/2000/svg">

  <!-- Identity transform: Copy everything
       (except for polygon/polyline, handled below) -->
  <xsl:template match="@*|node()">
    <xsl:copy>
      <xsl:apply-templates select="@*|node()"/>
    </xsl:copy>
  </xsl:template>

  <!-- Turn polygons/polylines into paths,
  copy all attributes and content
  (except for @points: Will be matched
  by template below) -->
  <xsl:template match="svg:polygon|svg:polyline">
    <path>
      <xsl:apply-templates select="@*|node()"/>
    </path>
  </xsl:template>

  <!-- Turn the points attribute into a d attribute -->
  <xsl:template match="@points">
    <xsl:attribute name="d">
      <xsl:value-of select="concat('M',.)"/>
      <!-- If we have a polygon, we need to make
           this a closed path by appending "z" -->
      <xsl:if test="parent::svg:polygon">
        <xsl:value-of select="'z'"/>
      </xsl:if>
    </xsl:attribute>
  </xsl:template>
</xsl:stylesheet>
