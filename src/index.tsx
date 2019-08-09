

function JSXDogCreateElement(element, properties, ...children: Zdog.Anchor[]) {
  const el = new element(properties) as Zdog.Anchor;
  children && children.filter(el => el !== undefined).forEach(child => {
    el.addChild(child);
  })
  return el;
}

// Made with Zdog

var illoSize = 72;
var minWindowSize = Math.min( window.innerWidth - 20, window.innerHeight - 60 );
var zoom = Math.floor( minWindowSize / illoSize );

var nilloElem = document.querySelector('.jsx-illo') as HTMLCanvasElement;
nilloElem.setAttribute( 'width', `${illoSize * zoom}` );
nilloElem.setAttribute( 'height', `${illoSize * zoom}` );


var isSpinning = true;
var TAU = Zdog.TAU;

// colors
var colors = {
  eye: '#333',
  white: '#FFF',
  hair: '#631',
  overalls: '#24D',
  cloth: '#E11',
  skin: '#FC9',
  leather: '#A63',
};

// -- illustration shapes --- //


// hat front
var hatFrontA = new Zdog.Vector({ x: -8, y: 0, z: 5 });
var hatFrontB = new Zdog.Vector({ x: -4, y: -3, z: 7 });
var hatFrontC = hatFrontB.copy().multiply({ x: -1 });
var hatFrontD = hatFrontA.copy().multiply({ x: -1 });

var hatTopFront = new Zdog.Vector({ x: 10, y: 1, z: 5 });
var hatTopBackA = new Zdog.Vector({ x: 7, y: 3, z: -10 });
var hatTopBackB = hatTopBackA.copy().multiply({ x: -1 });


function HatFront({color}) {
  return <Zdog.Shape 
    path={[
      hatFrontA,
      hatFrontB,
      hatFrontC,
      hatFrontD,
    ]}
    color={color}
    closed={false}
    fill={false}
    stroke={11} />
};


function HatTop({color}) {
  return <Zdog.Shape 
    path={[
      hatTopFront.copy().multiply({ x: -1 }),
      hatTopFront,
      hatTopBackA,
      hatTopBackB,
    ]}
    color={color}
    fill={true}
    stroke={9} />
}


function HatTopBack({color}) {
  return <Zdog.Shape 
    path={[
      hatTopBackA,
      hatTopBackB,
    ]}
    color={color}
    stroke={9} />
};

function HatTopSide({color}) {
  return <Zdog.Anchor>
    <Zdog.Shape 
      path={[
        hatTopFront,
        hatTopBackA,
      ]}
      color={color}
      stroke={9}
    />
    <Zdog.Shape 
      path={[
        hatTopFront,
        hatTopBackA,
      ]}
      color={color}
      stroke={9}
      scale={{ x: -1}}
    />
  </Zdog.Anchor>
}


function Hat({color}) {
  return <Zdog.Anchor translate={{y: -8}}>
    <HatFront color={color}/>
    <HatTop color={color}/>
    <HatTopBack color={color}/>
    <HatTopSide color={color}/>
    <HatTopCover color={color}/>
    <HatBrim color={color}/>
  </Zdog.Anchor>
}

function HatTopCover({color}) {
  return <Zdog.Shape 
    path={[
      { x: -3, y:  0, z: -8 },
      { x:  3, y:  0, z: -8 },
      { x:  3, y: -3, z: 4 },
      { x: -3, y: -3, z: 4 },
    ]} color={color} stroke={6} />
}

function HatBrim({color}) {
  return <Zdog.Anchor>
    <Zdog.Shape path={[
      { x: 10, y: 4, z: -0 },
      { x: 8, y: 4, z: 5 },
      { x: 0, y: 2, z: 9 },
      { x: 0, y: 1, z: 2 },
    ]} translate={{ z: 7 }} color={color} fill={true} stroke={4} />
    <Zdog.Shape path={[
      { x: 10, y: 4, z: -0 },
      { x: 8, y: 4, z: 5 },
      { x: 0, y: 2, z: 9 },
      { x: 0, y: 1, z: 2 },
    ]} translate={{ z: 7 }} color={color} fill={true} stroke={4} scale={-1} />
  </Zdog.Anchor>
}

// Head

function Nose({ color }) {
  return <Zdog.Shape translate={{ y: 5, z: 13 }} color={color} stroke={7}/>
}

function Chin({ color }) {
  return <Zdog.Anchor>
      <Zdog.Shape path={[
        { x: -5, y: 6, z: 4 },
        { x: 0, y: 8.5, z: 6 }
      ]} color={color} stroke={10}/>
      <Zdog.Shape path={[
        { x: -5, y: 6, z: 4 },
        { x: 0, y: 8.5, z: 6 }
      ]} color={color} stroke={10} scale={{x: -1}}/>
  </Zdog.Anchor>
}

function Mouth({ color }) {
  return <Zdog.Shape path={[
    { x: -3, y: -3 },
    { x: -1, y: -1 },
    { x:  1, y: -1 },
    { x:  3, y: -3 },
  ]}
  translate={{ y: 12, z: 9 }}
  color={color}
  fill={true}
  stroke={2} />
}

function Pupil({ flip }) {
  return <Zdog.Shape path={ [
    { y: 2 },
    { y: 4 },
  ]} translate={{ x: flip ? 5: -5, z: 9 }} color={colors.eye} stroke={3}/>
}

function Brow({flip}) {
  return <Zdog.Shape
  path={[
    { x: 3, y: 0, z: -0 },
    { x: 1.5, y: -0.5, z: 1 },
    { x: 0, y: 0, z: 1 },
  ]}
  translate={{x: flip ? 4 : -4, y: -1.5, z: 9 }} color={colors.hair} closed={false} stroke={2.5} />
}

function Eyes() {
  return <Zdog.Anchor>
    <Pupil flip={false} />
    <Pupil flip={true}/>
    <Brow flip={false} />
    <Brow flip={true}/>
  </Zdog.Anchor>
}

function Moustache() {
  return <Zdog.Anchor>
    <MoustacheSection scale={1}></MoustacheSection>
    <MoustacheSection scale={-1}></MoustacheSection>
  </Zdog.Anchor>
}

function MoustacheSection({scale}) {
  return <Zdog.Group translate={{ y: 6.5, z: 10 }} scale={{x: scale}}>
    <Zdog.Shape path={[ { x: 2, y: 1, z: 1.5 }, { x: 6.5, y: 0, z: -0 }]} color={colors.hair} stroke={3} />
    <Zdog.Shape translate={{ x: 1.75, y: 1.5, z: 1 }} color={colors.hair} stroke={4} />
    <Zdog.Shape translate={{ x: 4.5, y: 1, z: 0.75 }} color={colors.hair} stroke={4} />
  </Zdog.Group>
}

function Sideburn() {
 return <Zdog.Shape
  path={[
    { y:  0, z:  0 },
    { y: -4, z:  1.5 },
    { y: -4, z: 1 },
    { y: -1, z: 2 },
  ]} translate={{ x: 10, y: 3, z: 2 }} color={colors.hair} closed={false} fill={true} stroke={3} />
}

function SideBurns() {
  const sideburn = <Sideburn/>
  const sideburn2 = sideburn.copy({
    translate: sideburn.translate.copy().multiply({ x: -1 }),
  });
  return <Zdog.Anchor>
    {sideburn}
    {sideburn2}
  </Zdog.Anchor>
}


function Head({ skin, hat, x=0 }) {
  return <Zdog.Shape translate={{y: -12, z: 1, x: x}} color={skin} stroke={23}>
    <Chin color={skin} />
    <Nose color={skin} />
    <Mouth color={colors.cloth} />
    <Hat color={hat}/>
    <Eyes />
    <Moustache />
    <SideBurns/>
    <Ears/>
    <Hair />
  </Zdog.Shape>
}


const nIllo = <Zdog.Illustration 
  element=".jsx-illo" 
  zoom={zoom}
  dragRotate={true}
  onDragStart={() => { isSpinning = false }}>
  <Character color={colors.cloth} x={-20} />
  <Character color="#0c0" x={+20} />
</Zdog.Illustration>

function Character({ color, ...props}) {
  return <Zdog.Anchor>
    <Head skin={colors.skin} hat={color} {...props}/>
    <Body color={color} {...props}/>
  </Zdog.Anchor>
}


function Ears() {
  var ear = new Zdog.Shape({
    path: [
      { x: 0, y:  0, z: -0 },
      { x: 0, y: -4, z: -0 },
      { x: 1, y: -4, z: -2 },
      { x: 0, y:  0, z: -1 },
    ],
    translate: { x: 10, y: 4, z: -2 },
    color: colors.skin,
    fill: true,
    stroke: 4,
  });
  var ear2 = ear.copy({
    scale: { x: -1 },
    translate: ear.translate.copy().multiply({ x: -1 }),
  });
  return <Zdog.Anchor>{ear}{ear2}</Zdog.Anchor>
}

function Hair() {
  const sideHair = <Zdog.Anchor/>
  new Zdog.Shape({
    path: [
      { x: 4, y: -7,   z: -1 },
      { x: 3, y:  0,   z: -0 },
      { x: 0, y:  0,   z: -5 },
      { x: 2, y: -6.5, z: -6 },
    ],
    translate: { x: 5, y: 7, z: -5 },
    color: colors.hair,
    fill: true,
    stroke: 3,
    addTo: sideHair,
  });
  // hair balls
  var hairBall = new Zdog.Shape({
    translate: { x: 6, y: 8, z: -8 },
    color: colors.hair,
    stroke: 6,
    addTo: sideHair,
  });
  hairBall.copy({
    translate: { x: 2, y: 8, z: -10 },
  });
  
  sideHair.copyGraph({
    scale: { x: -1 },
  });
  new Zdog.Shape({
    path: [
      { x:  5, y:  0,   z: -0 },
      { x:  6, y: -6.5, z: -1 },
      { x: -6, y: -6.5, z: -1 },
      { x: -5, y:  0,   z: -0 },
    ],
    translate: { y: 7, z: -10 },
    color: colors.hair,
    fill: true,
    addTo: sideHair,
    stroke: 3,
  });
  return sideHair;
}

function Body({ color, x=0 }) {
  var body = new Zdog.Shape({
    translate: { x: x, y: 10, z: 1 },
    color: colors.overalls,
    stroke: 20,
  });
  
  // right arm
  var rightShoulder = { x: -8, y: -8, z: -3 };
  var rightWrist = new Zdog.Vector({ x: -14, y: -17, z: -0 });
  new Zdog.Shape({
    path: [
      rightShoulder,
      rightWrist,
    ],
    color: color,
    stroke: 8,
    addTo: body,
  });
  
  // right hand
  new Zdog.Shape({
    path: [
      { x: -17, y: -23, z: 1 },
    ],
    color: colors.white,
    stroke: 12,
    addTo: body,
  });
  
  // left arm
  var leftShoulder = { x: 6, y: -7, z: -4 };
  var leftElbow = { x: 8, y: -4, z: -8 };
  new Zdog.Shape({
    path: [
      leftShoulder,
      leftElbow,
    ],
    color: color,
    stroke: 8,
    addTo: body,
  });
  new Zdog.Shape({
    path: [
      leftElbow,
      { x: 12, y: -2, z: -9 },
    ],
    color: color,
    stroke: 8,
    addTo: body,
  });
  // left hand
  new Zdog.Shape({
    path: [
      { x: 17, y: 1, z: -8 },
    ],
    color: colors.white,
    stroke: 12,
    addTo: body,
  });
  
  new Zdog.Shape({
    path: [
      leftShoulder,
      rightShoulder,
    ],
    color: color,
    stroke: 8,
    addTo: body,
  });
  
  // right leg
  var rightLeg = new Zdog.Shape({
    path: [
      { y:  4, z: 2 },
      { y: 10, z: 1 },
      { y: 12, z: -0 }
    ],
    translate: { x: -5 },
    closed: false,
    color: colors.overalls,
    stroke: 10,
    addTo: body,
  });
  
  var shoe = new Zdog.Rect({
    addTo: rightLeg,
    width: 4,
    height: 7,
    translate: { y: 15.5, z: -4 },
    fill: true,
    color: colors.leather,
    stroke: 6,
  });
  
  // toe ball
  new Zdog.Shape({
    addTo: shoe,
    translate: { y: 3, z: 2.5 },
    color: colors.leather,
    stroke: 11,
  });
  
  // left leg
  var leftLeg = new Zdog.Shape({
    path: [
      { y: 4, z: 2 },
      { y: 2, z: 7 },
      { y: 3, z: 11 },
    ],
    translate: { x: 5 },
    closed: false,
    color: colors.overalls,
    stroke: 10,
    addTo: body,
  });
  
  shoe.copyGraph({
    addTo: leftLeg,
    translate: { y: 2, z: 18 },
    rotate: { x: TAU * (160/360) },
  });
  return body;
}


// -- animate --- //

function animate() {
  nIllo.rotate.y += isSpinning ? -0.05 : 0;
  nIllo.updateRenderGraph();
  requestAnimationFrame( animate );
}

animate();

