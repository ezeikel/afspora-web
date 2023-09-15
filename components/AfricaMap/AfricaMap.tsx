'use client';

import React, { useEffect } from 'react';
import * as d3 from 'd3';
import GeoJSON from 'geojson';

const AfricaMap: React.FC = () => {
  useEffect(() => {
    const redrawMap = () => {
      const container = document.getElementById('map');
      const width = container ? container.offsetWidth : 800;
      let height = container ? container.offsetHeight : 800;

      if (height === 0) {
        height = width;
      }

      // Remove existing SVG
      d3.select('#map').selectAll('svg').remove();

      // Set up projection
      const projection = d3.geoMercator().scale(1).translate([0, 0]);

      const path = d3.geoPath().projection(projection);

      // Create SVG
      const svg = d3
        .select('#map')
        .append('svg')
        .attr('viewBox', `0 0 ${width} ${height}`);

      const g = svg.append('g');

      // Tooltip
      const tooltip = d3
        .select('body')
        .append('div')
        .attr('class', 'tooltip')
        .style('position', 'absolute')
        .style('visibility', 'hidden');

      // Load data and render
      d3.json('/json/africa-countries.geojson').then((data: unknown) => {
        const geoData = data as GeoJSON.FeatureCollection;

        // Auto fit to container
        const bounds = geoData ? path.bounds(geoData) : [];
        const scaleX = (bounds[1][0] - bounds[0][0]) / width;
        const scaleY = (bounds[1][1] - bounds[0][1]) / height;
        const scale = 1 / Math.max(scaleX, scaleY);
        const transl: [number, number] = [
          (width - scale * (bounds[1][0] + bounds[0][0])) / 2,
          (height - scale * (bounds[1][1] + bounds[0][1])) / 2,
        ];

        projection.scale(scale).translate(transl);

        // Draw countries
        svg
          .selectAll('path')
          .data(geoData?.features ?? [])
          .enter()
          .append('path')
          .attr('d', path as any)
          .attr('fill', '#ccc')
          .attr('stroke', '#333')
          .attr('stroke-width', 1)
          .on('mouseover', (_, d) => {
            tooltip.style('visibility', 'visible');
            tooltip.text((d as any).properties.sovereignt); // sovereignt is the country name
          })
          .on('mousemove', (event) => {
            tooltip
              .style('top', `${event.pageY - 10}px`)
              .style('left', `${event.pageX + 10}px`);
          })
          .on('mouseout', () => {
            tooltip.style('visibility', 'hidden');
          });

        const zoom = d3
          .zoom()
          .scaleExtent([1, 8])
          .on('zoom', (event: d3.D3ZoomEvent<SVGGElement, unknown>) => {
            g.attr('transform', event.transform.toString());
          });

        (g as any).call(zoom);
      });
    };

    // Initial draw
    redrawMap();

    // Handle window resize
    window.addEventListener('resize', redrawMap);

    return () => {
      window.removeEventListener('resize', redrawMap);
    };
  }, []);

  return <div id="map" />;
};

export default AfricaMap;
