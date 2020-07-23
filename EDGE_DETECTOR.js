const __P = new IMG_FUNCTIONS();
const __HTML = new HtmlRender();
const __F = new Filter();
    
class EDGE_DETECTOR
{
    constructor() 
    {
        __P._IMAGE_LOAD('Logos/google.jpg', (DATA) => 
        {   
            const state = {
                items: 
                [
                    { id: 1, name: 'Eggs' },
                    { id: 2, name: 'Milk' },
                    { id: 3, name: 'Steak' },
                    { id: 4, name: 'Water' }
                ]
            };

            console.log(this.gettt(state), 'state');
            console.log(this.gettt2(state), 'state2');

            this._IMAGE_EXTRACT(DATA);
            let l1 =
            {
                A: -15.126960492356561,
                B: 86.70299781616042,
                L: 90.18190391105817
            }
            let l2 =
            {
                A: -15.466666666666667,
                B: 89.19025974025973,
                L: 92.59329004329004
            }
            console.log(__P._ECQUALIDIAN_DISTANCE(l1, l2), 'eq distance');
            // console.log(JSON.stringify(a1) == JSON.stringify(a2));
            // __P._APPEND_CANVAS(DATA);
            this.TEST(DATA);
        });
    }
    gettt(state)
    {
        return {
            ...state,
            items: state.items.filter(item => item.id !== 2)
        }
    }
    gettt2(state)
    {
        return {
            // ...state,
            items: state.items.filter(item => item.id !== 2)
        }
    }
    TEST(DATA)
    {
        let RGB =
        {
            R: 0, G: 0, B:255
        }
        console.log(__P._rgb2lab(RGB), 'rgb');
        var canvas = document.getElementById('mycanvas');
        var ctx = canvas.getContext('2d');
        for(let Y=0; Y<DATA.height; Y++)
        {
            for(let X=0; X<DATA.width; X++)
            {
                let RGB = __P._GET_ALL_PIX_RGB(DATA, X, Y);
                __HTML._PLOT_GRAPH_CANVAS(RGB.R, RGB.G, RGB.B, ctx);
            }
        }
    }

    _IMAGE_EXTRACT(ODATA)
    {
        let THRESHOLD=50;

        // let COLOR = 
        // [
        //     { R: 244, G:66, B:212 },
        //     { R: 66, G:134, B:244 },
        //     { R: 244, G:66, B:66 },
        //     { R: 232, G:244, B:66 },
        //     { R: 107, G:244, B:66 }

        // ];
        // __P._APPEND_COLORS(COLOR);

        let DATA = __P._DUPLICATE(ODATA);
        // DATA = __F._GUSSIAN_BLUR_RGB2(DATA);
        let DATA02 = __P._DUPLICATE(DATA);
        let DATA003 = __P._DUPLICATE(DATA);

        __P._APPEND_CANVAS(DATA);

        let CLUSTER = [];
        // let LAB_DATA = [];
        let EXIST;
        for(let i=0; i<DATA.data.length; i+=4)
        {
            let LAB = __P._RGB2LAB([DATA.data[i], DATA.data[i+1], DATA.data[i+2]]);
            // LAB_DATA.push(LAB);
            EXIST = false;
            for(let j=0; j<CLUSTER.length; j++)
            {
                CLUSTER[j].LAB = {
                    L: CLUSTER[j].L/CLUSTER[j].C,
                    A: CLUSTER[j].A/CLUSTER[j].C,
                    B: CLUSTER[j].B/CLUSTER[j].C
                }
                if((__P._ECQUALIDIAN_DISTANCE(CLUSTER[j].LAB, LAB) <= THRESHOLD))
                {
                    CLUSTER[j].C += 1;
                    CLUSTER[j].i.push(i/4);
                    CLUSTER[j].L += LAB.L;
                    CLUSTER[j].A += LAB.A;
                    CLUSTER[j].B += LAB.B;
                    EXIST = true;
                    break;
                }
            }
            if(CLUSTER.length == 0 || !EXIST)
            {
                CLUSTER.push(
                    {
                        LAB: LAB,
                        L: LAB.L, A: LAB.A, B: LAB.B,
                        C: 1,
                        i: [i/4]
                    } 
                )
                console.clear();
                console.log((i/DATA.data.length)*100 + '% completed');
            }
        }
        console.log(CLUSTER, 'CLUSTER');
        let CLEAR_DATA = __P._DUPLICATE(DATA);
        for(let y=0; y<DATA.height; y++)
        {
            for(let x=0; x<DATA.width; x++)
            {
                __P._SET_ALL_PIX_RGB(CLEAR_DATA, x, y, 0, 0, 0);
            }
        }
        let CLUSTER_DATA = [];
        for(let i=0; i<CLUSTER.length; i++)
        {
            DATA = __P._DUPLICATE(CLEAR_DATA);
            let RGB = __P._lab2rgb(CLUSTER[i].LAB)
            for(let j=0; j<CLUSTER[i].i.length; j++)
            {
                __P._SET_PIX_INDEX_RGB(DATA, CLUSTER[i].i[j], RGB);
                __P._SET_PIX_INDEX_RGB(ODATA, CLUSTER[i].i[j], RGB)
            }
            __P._APPEND_COLOR(RGB);
            CLUSTER_DATA.push(DATA);
            __P._APPEND_CANVAS(DATA);
        }
        __P._APPEND_CANVAS(ODATA);
        __P._APPEND_CANVAS(DATA);


        console.log(CLUSTER_DATA, 'CLUSTER_DATA');
        console.log(CLUSTER, 'CLUSTER');
        this._DETECT_EDGES(CLUSTER_DATA, CLUSTER);
        // __HTML._NOPARAMS2(ODATA, LAB_DATA);
    }









    _DETECT_EDGES(__D, __C)
    {
        let FILTERS = __P._GET_SOBEL_FILTERS();
        let SUM = 0;
        for(let i=0; i<__C.length; i++)
        {
            let DUP = __P._DUPLICATE(__D[i]);
            for(let j=0; j<__C[i].i.length; j++)
            {
                let AXIS = __P._GET_AXIS(__D[i], __C[i].i[j]);
                let MATRIX = __P._GET_NEIGHBOURS_PIX_SKIP_EDGE_RGB(__D[i], AXIS.X, AXIS.Y);           
                let OBJECT = __P._MULTIPLY_OBJECT_ARR_RGB(FILTERS, MATRIX);
                let MAGNITUDE = __P._FIND_MAGNITUDE_RGB(OBJECT);
                if(MAGNITUDE < 20)
                    __P._SET_ALL_PIX(DUP, AXIS.X, AXIS.Y, 0);
               else
                    __P._SET_ALL_PIX(DUP,  AXIS.X,  AXIS.Y, 255);
            }
            __P._APPEND_CANVAS(DUP);
        }
        // console.log(SUM, (SUM/ORIGINAL.data.length)*10);
        __P._APPEND_CANVAS(DUPLICATE);
        // this._CANNY(DUPLICATE);
    }

}

const EDGE = new EDGE_DETECTOR();
