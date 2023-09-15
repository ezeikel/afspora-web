'use client';

import { useEffect } from 'react';
import * as d3 from 'd3';
import { FeatureCollection, Geometry } from 'geojson';

const AfricaMap: React.FC = () => {
  useEffect(() => {
    d3.select('#map').selectAll('svg').remove();

    // Add tooltip
    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden');

    // Set dimensions
    const width = 800;
    const height = 800;

    // Create SVG
    const svg = d3
      .select('#map')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Setup projection and path
    const projection = d3.geoMercator().scale(1).translate([0, 0]);

    const path = d3.geoPath().projection(projection);

    // Load GeoJSON data
    d3.json<FeatureCollection<Geometry>>('/json/africa-countries.geojson').then(
      (data) => {
        // Auto fit to container
        const bounds = data ? path.bounds(data) : [];
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
          .data(data?.features ?? [])
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
      },
    );
  }, []);

  return <div id="map" />;
};

export default AfricaMap;
