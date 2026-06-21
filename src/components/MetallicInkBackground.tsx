import { useEffect, useRef } from 'react';

const VERTEX_SHADER = `
  attribute vec2 a_position;
  varying vec2 vUv;
  void main() {
    vUv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;
  varying vec2 vUv;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_mouseVel;
  uniform float u_mixFactor;
  uniform vec3 u_inkColor;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
           + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
           dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float sum = 0.0;
    float amp = 1.0;
    float freq = 1.0;
    for (int i = 0; i < 5; i++) {
      sum += amp * snoise(p * freq);
      freq *= 2.0;
      amp *= 0.5;
    }
    return sum;
  }

  vec3 sampleColorA(vec2 uv) {
    float n = fbm(uv * 3.0 + u_time * 0.2);
    return vec3(0.92, 0.90, 0.85) + n * 0.1;
  }

  vec3 sampleColorB(vec2 uv) {
    vec2 p = uv * 2.0;
    float n = fbm(p + fbm(p + u_time * 0.1));
    vec3 warmGold = vec3(0.75, 0.6, 0.4);
    vec3 bronze = vec3(0.4, 0.3, 0.2);
    vec3 cream = vec3(0.95, 0.92, 0.85);
    float t = smoothstep(0.3, 0.7, n);
    vec3 color = mix(cream, bronze, t);
    float highlight = smoothstep(0.5, 0.8, n);
    return mix(color, warmGold, highlight * 0.3);
  }

  vec3 sampleColorC(vec2 uv) {
    vec2 p = uv * 3.0;
    vec2 q = vec2(fbm(p + vec2(0.0, 0.0) + u_time*0.1), fbm(p + vec2(5.2, 1.3) + u_time*0.15));
    vec2 r = vec2(fbm(p + 4.0*q + vec2(1.7, 9.2) + u_time*0.05), fbm(p + 4.0*q + vec2(8.3, 2.8) + u_time*0.1));
    float n = fbm(p + 4.0*r);
    vec3 darkGreen = u_inkColor * 0.5;
    vec3 deepBlackGreen = u_inkColor * 0.2;
    float t = smoothstep(0.2, 0.6, n);
    vec3 color = mix(darkGreen, u_inkColor, t);
    float veins = smoothstep(0.3, 0.5, n) * (1.0 - smoothstep(0.5, 0.8, n));
    color = mix(color, deepBlackGreen, veins * 0.5);
    return color;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    vec3 color = sampleColorA(uv);
    if (u_mixFactor > 0.0) {
      vec3 colorB = sampleColorB(uv);
      color = mix(color, colorB, u_mixFactor);
    }
    if (u_mixFactor > 0.5) {
      float factor = (u_mixFactor - 0.5) * 2.0;
      vec3 colorC = sampleColorC(uv);
      color = mix(color, colorC, factor);
    }
    float mouseDist = length(uv - u_mouse);
    float mouseInfluence = smoothstep(0.5, 0.0, mouseDist);
    color += u_mouseVel * mouseInfluence * 0.5;
    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function MetallicInkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const uniformsRef = useRef<Record<string, WebGLUniformLocation | null>>({});
  const mouseRef = useRef({ x: 0.5, y: 0.5, prevX: 0.5, prevY: 0.5, vel: 0 });
  const mixFactorRef = useRef(0);
  const startTimeRef = useRef(Date.now());
  const rafRef = useRef(0);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
    if (!gl) return;
    glRef.current = gl;

    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }
    programRef.current = program;
    gl.useProgram(program);

    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1, 1, -1, -1, 1,
      -1, 1, 1, -1, 1, 1,
    ]), gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    uniformsRef.current = {
      u_time: gl.getUniformLocation(program, 'u_time'),
      u_resolution: gl.getUniformLocation(program, 'u_resolution'),
      u_mouse: gl.getUniformLocation(program, 'u_mouse'),
      u_mouseVel: gl.getUniformLocation(program, 'u_mouseVel'),
      u_mixFactor: gl.getUniformLocation(program, 'u_mixFactor'),
      u_inkColor: gl.getUniformLocation(program, 'u_inkColor'),
    };

    function resize() {
      if (!canvas || !gl) return;
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = 1.0 - e.clientY / window.innerHeight;
      const dx = mouseRef.current.x - mouseRef.current.prevX;
      const dy = mouseRef.current.y - mouseRef.current.prevY;
      mouseRef.current.vel = Math.min(1.0, Math.sqrt(dx * dx + dy * dy) * 10);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Ramp up mixFactor on load
    const rampInterval = setInterval(() => {
      mixFactorRef.current = Math.min(1.0, mixFactorRef.current + 0.008);
    }, 16);
    setTimeout(() => clearInterval(rampInterval), 3000);

    function render() {
      if (!gl || !programRef.current || !isVisibleRef.current) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }

      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const u = uniformsRef.current;

      gl.uniform1f(u.u_time, elapsed);
      gl.uniform2f(u.u_resolution, canvas!.width, canvas!.height);
      gl.uniform2f(u.u_mouse, mouseRef.current.x, mouseRef.current.y);
      gl.uniform1f(u.u_mouseVel, mouseRef.current.vel);
      gl.uniform1f(u.u_mixFactor, mixFactorRef.current);
      gl.uniform3f(u.u_inkColor, 0.29, 0.39, 0.25);

      mouseRef.current.vel *= 0.95;

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafRef.current = requestAnimationFrame(render);
    }
    rafRef.current = requestAnimationFrame(render);

    // Visibility observer
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearInterval(rampInterval);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}
