import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { GraphComponent, GraphEditorInputMode, License, Point, Rect,ShapeNodeStyle } from 'yfiles';
import { FlightsService } from 'src/app/services/flights.service';
import licenseData from '../../license.json';

License.value = licenseData;
const myNodeStyle = new ShapeNodeStyle({
  shape: 'ellipse',
  fill: '#87aacc',
  stroke: 'rgb(0,50,200)'
})

@Component({
  selector: 'app-graph-component',
  templateUrl: './graph-component.component.html',
  styleUrls: ['./graph-component.component.css']
})
export class GraphComponentComponent implements AfterViewInit {
  @ViewChild('graphComponentRef') graphComponentRef!: ElementRef;
  graphComponent!: GraphComponent;
  myFlights : string[][]
  basicLocation : number = 30
  isFlights :boolean = true

  node1 : Node
  node2 : Node
  node3 : Node

  constructor(private flightsService: FlightsService) { }

  ngOnInit(): void {
    this.myFlights = this.flightsService.getFlights()

  }

  ngAfterViewInit() {
    // instantiate a new GraphComponent
    this.graphComponent = new GraphComponent(this.graphComponentRef.nativeElement);

    // configure an input mode for out of the box editing
    this.graphComponent.inputMode = new GraphEditorInputMode();

    // create some graph elements
    this.createSampleGraph(this.graphComponent.graph);

    // center the newly created graph
    this.graphComponent.fitGraphBounds();
  }


  getFlights(event){
    this.isFlights = !this.isFlights
  }

  createSampleGraph(graph) {
  
      graph.nodeDefaults.style = myNodeStyle

    for (let i=0;i<this.myFlights.length;i++){
      this.node1 = graph.createNodeAt(new Point(30+this.basicLocation, 30+this.basicLocation));
      let mystr =  this.myFlights[i][0]
      graph.addLabel(this.node1, this.myFlights[i][0]);
      if(this.node1&&this.node2){
        graph.createEdge(this.node3, this.node1);
      }
      this.basicLocation = this.basicLocation+30
      this.node2 = graph.createNodeAt(new Point(50+this.basicLocation, 30+this.basicLocation));
      graph.addLabel(this.node2, this.myFlights[i][1]);

      this.basicLocation = this.basicLocation+50
      this.node3 = this.node2
      graph.createEdge(this.node1, this.node2);
    }
  }



}
