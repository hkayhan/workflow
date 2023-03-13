import React, {useEffect, useState} from 'react';
import {fireBaseApi} from 'api/firebaseapi'

function Workflows(props) {

    const [newFlowVisible, setNewFlowVisible] = useState(false)
    const [newFlowName, setNewFlowName] = useState("")
    const [workFlowsDB, setWorkFlowsDB] = useState([])
    const [relationsDB, setRelationsDB] = useState([])
    const [workFlowNames, setWorkFlowNames] = useState([])
    const [selectedWorkFlowID, setSelectedWorkFlowID] = useState([])
    const [selectedWorkFlowSteps, setSelectedWorkFlowSteps] = useState([])

    useEffect(() => {
        getRelationsFromDB()
        getWorkFlowsFromDB()
    }, [])

    useEffect(() => {
        console.log("workFlowsDB", workFlowsDB);
        console.log("relationsDB", relationsDB);

        setWorkFlowNames(filterWorkFlowsStepsWithParents(0))
    }, [workFlowsDB, relationsDB])

    useEffect(() => {
        setSelectedWorkFlowSteps(filterWorkFlowsStepsWithParents(selectedWorkFlowID))
    }, [selectedWorkFlowID])
    const createNewWorkFlow = () => {

        fireBaseApi().post('/workflows.json', {"flowName": newFlowName},

            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => stepRelationships(res.data.name, [0]))
            .catch(err => console.log(err));
    }

    const addNewStep = () => {
        fireBaseApi().post('/workflows.json', {"flowName": newFlowName},

            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => stepRelationships(res.data.name, [selectedWorkFlowID]))
            .catch(err => console.log(err));
    }
    const stepRelationships = (id, parents) => {
        console.log("stepRelationships",parents);
        parents.forEach(p => {
            console.log(p);
            fireBaseApi().post('/stepRelationships.json', {"childID": id, "parentID": p},

                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => getRelationsFromDB())
                .catch(err => console.log(err));
        })
    }

    const getWorkFlowsFromDB = () => {
        fireBaseApi().get("workflows.json")
            .then(res => {

                setWorkFlowsDB(res.data)
            })
            .catch(err => console.log(err))
    }

    const getRelationsFromDB = () => {
        fireBaseApi().get("stepRelationships.json?parentId=0")
            .then(res => {
                // console.log(res.data)
                setRelationsDB(res.data)
            })
            .catch(err => console.log(err))
    }

    const filterWorkFlowsStepsWithParents = (parentID) => {
        let workFlowNamesArr = []
        for (const key in relationsDB) {
            console.log(relationsDB[key]);
            if (relationsDB[key].parentID === parentID) {

                let wf = workFlowsDB[relationsDB[key].childID]

                console.log(wf);

                workFlowNamesArr.push({"ID": relationsDB[key].childID, ...wf})
                // console.log(relationsDB[key]);
            }
        }
        // console.log(workFlowNamesArr);
        return workFlowNamesArr
    }


    return (
        <div>

            <div>Akış şablonları</div>
            <div className={"d-flex flex-row-reverse pe-5"}>
                <button onClick={() => setNewFlowVisible(true)} className={"btn btn-success"}>Yeni Akış Oluştur
                </button>

            </div>
            {newFlowVisible &&
                <div className={"d-flex mt-3 mb-3 pe-5"}>
                    <div className="input-group me-2 ">
                        <input onChange={e => setNewFlowName(e.target.value)} placeholder={"Akış Adı"} type="text"
                               className="form-control"
                               aria-label="Sizing example input"
                               aria-describedby="inputGroup-sizing-default"/>
                    </div>
                    <button onClick={() => createNewWorkFlow()} className={"btn btn-success"}>Ekle</button>

                </div>
            }


            <h4 className="mt-4">Kayıtlı Akışlar</h4>
            <hr/>
            {workFlowNames.map((w, i) =>
                <div key={i} onClick={() => setSelectedWorkFlowID(w.ID)}>
                    <div
                        className={"border p-2 mb-2 rounded pointer bg-white ps-3 fw-bold text-uppercase"}> {w.flowName}</div>
                    {
                        selectedWorkFlowID === w.ID && <>
                            {selectedWorkFlowSteps.map((s, i) =>
                                <div className={"border d-flex mb-2 mx-5 p-2 ps-3 rounded bg-white"}>
                                    {s.flowName}
                                </div>
                            )}
                            <div className={"d-flex mt-3 mb-5 px-5"}>

                                <div className="input-group me-2 ">
                                    <input onChange={e => setNewFlowName(e.target.value)} type="text"
                                           className="form-control"
                                           aria-label="Sizing example input"
                                           aria-describedby="inputGroup-sizing-default"
                                           placeholder={"Yeni Adım"}
                                    />
                                </div>
                                <button onClick={() => addNewStep()} className={"btn btn-success"}>Ekle</button>

                            </div>
                            <hr/>
                        </>

                    }
                    <div>

                    </div>

                </div>
            )}


        </div>);
}

export default Workflows;
