import React, {useEffect, useRef, useState} from 'react';
import {fireBaseApi} from 'api/firebaseapi'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FeatherIcon from "feather-icons-react";

function Workflows(props) {

    const [newFlowVisible, setNewFlowVisible] = useState(false)
    const [newFlowName, setNewFlowName] = useState("")
    const [workFlowsDB, setWorkFlowsDB] = useState([])
    const [relationsDB, setRelationsDB] = useState([])
    const [workFlowNames, setWorkFlowNames] = useState([])
    const [selectedWorkFlowID, setSelectedWorkFlowID] = useState([])
    const [selectedWorkFlowSteps, setSelectedWorkFlowSteps] = useState([])
    const [selectedParentsID, setSelectedParentsID] = useState([])
    const [selectedStepID, setSelectedStepID] = useState([])
    const [deleteStepID, setDeleteStepID] = useState(null)

    useEffect(() => {
        getRelationsFromDB()
    }, [])

    useEffect(() => {
        async function fetchData() {
            const wfNames = await filterWorkFlowsStepsWithParents(0)
            setWorkFlowNames(wfNames)
        }

        fetchData();

    }, [workFlowsDB, relationsDB])

    useEffect(() => {
        async function fetchData() {
            let steps = []
            const wfSteps = await filterWorkFlowsStepsWithParents(selectedWorkFlowID)
            for (const wfStep of wfSteps) {
                // console.log(wfStep.ID);
                let parents = await filterWorkFlowsStepsWithChild(wfStep.ID)
                // console.log(parents);
                steps.push({"parents": parents, ...wfStep})
                // console.log(steps);
            }
            setSelectedWorkFlowSteps(steps)
        }

        fetchData()

    }, [selectedWorkFlowID, workFlowsDB, relationsDB])

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
        let parents = [selectedWorkFlowID, ...selectedParentsID];
        console.log(selectedParentsID);

        fireBaseApi().post('/workflows.json', {"flowName": newFlowName},
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => stepRelationships(res.data.name, parents))
            .catch(err => console.log(err));
    }

    const stepRelationships = async (id, parents) => {
        for (const parent of parents) {
            await fireBaseApi().post('/stepRelationships.json', {"childID": id, "parentID": parent},
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => {
                    console.log("in res");
                })
                .catch(err => console.log(err));
        }

        getRelationsFromDB()
    }

    const getRelationsFromDB = async () => {
        await fireBaseApi().get("stepRelationships.json")
            .then(res => {
                setRelationsDB(res.data)
                console.log("relationsDB");
                console.table(res.data);
            })
            .catch(err => console.log(err))
        await getWorkFlowsFromDB()
    }

    const getWorkFlowsFromDB = async () => {
        await fireBaseApi().get("workflows.json")
            .then(res => {
                setWorkFlowsDB(res.data)
                console.log("getWorkFlowsFromDB");
                console.table(res.data);
            })
            .catch(err => console.log(err))
        // console.log("before filter");
        // let wfNames = await filterWorkFlowsStepsWithParents(0)
        // console.log("after filter");
        // setWorkFlowNames(wfNames)
        // console.log("after state");
    }

    const filterWorkFlowsStepsWithParents = async (parentID) => {
        let workFlowNamesArr = []
        for (const key in relationsDB) {
            if (relationsDB[key].parentID === parentID) {

                let wf = workFlowsDB[relationsDB[key].childID]
                workFlowNamesArr.push({"ID": relationsDB[key].childID, ...wf})
                console.log("workFlowNamesArr");
                console.log(workFlowNamesArr);
            }
        }
        return workFlowNamesArr
    }

    const filterWorkFlowsStepsWithChild = async (childID) => {
        console.log(childID);
        let workFlowNamesArr = []
        for (const key in relationsDB) {
            if (relationsDB[key].childID === childID) {

                let wf = workFlowsDB[relationsDB[key].parentID]
                workFlowNamesArr.push({"ID": relationsDB[key].parentID, ...wf})
                console.log("workFlowNamesArr");
                console.log(workFlowNamesArr);
            }
        }
        return workFlowNamesArr
    }

    const selectedParents = () => {
        let result = []
        let checkBoxes = document.getElementById('subtasks').querySelectorAll('input[type="checkbox"]'); // get all the checkbox

        checkBoxes.forEach(cb => {
            if (cb.checked) {
                result.push(cb.value)
            }
        })

        console.log(result);

        setSelectedParentsID(result)
    }

    const deleteAllSteps = (stepID) => {

    }
    const [modalShow, setModalShow] = useState(false);

    const handleClose = () => {
        setModalShow(false)
    };
    const handleShow = () => deleteAllSteps(deleteStepID)



    return (
        <div>

            <Modal show={modalShow}
                   size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered
                   onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleShow}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <div>Akış şablonları</div>
            <div className={"d-flex flex-row-reverse pe-5"}>
                <button onClick={() => {
                    setNewFlowVisible(true)
                }} className={"btn btn-success"}>Yeni Akış Oluştur
                </button>

            </div>
            {newFlowVisible && <div className={"d-flex mt-3 mb-3 pe-5"}>
                <div className="input-group me-2 ">
                    <input onChange={e => setNewFlowName(e.target.value)} placeholder={"Akış Adı"} type="text"
                           className="form-control"
                           aria-label="Sizing example input"
                           aria-describedby="inputGroup-sizing-default"/>
                </div>
                <button onClick={() => {
                    createNewWorkFlow()
                    setNewFlowVisible(false)
                }} className={"btn btn-success"}>Ekle
                </button>

            </div>}


            <h4 className="mt-4">Kayıtlı Akışlar</h4>
            <hr/>
            {workFlowNames.map((w, i) => <div key={i} onClick={() => setSelectedWorkFlowID(w.ID)}>
                <div
                    className={"border p-2 mb-2 rounded pointer bg-white ps-3 fw-bold text-uppercase"}> {w.flowName}</div>
                {selectedWorkFlowID === w.ID && <div id={"subtasks"}>
                    {selectedWorkFlowSteps.map((s, i) =>
                        <div key={i} className={"border rounded bg-white mb-2 mx-5 p-2 ps-1 pointer transition"}
                        >
                            <div key={i}
                                 className={"d-flex   "}>
                                <div className={"checkbox-label"}>

                                    <input className={""} type="checkbox" onChange={() => selectedParents()}
                                           value={s.ID}/>

                                </div>
                                <div onClick={() => setSelectedStepID(s.ID === selectedStepID ? "" : s.ID)}
                                     className={"ms-2 h-100 w-100"}>
                                    {s.flowName}
                                </div>
                                <div className={"pointer"} onClick={() => {
                                    setModalShow(true)
                                    setDeleteStepID(s.ID)
                                    // deleteStepsConfirm(s.ID)
                                    // setDeleteStepID(s.ID)
                                    // setDeleteFlowVisible(true)
                                }}>
                                    <FeatherIcon icon={"trash-2"} size={20}/>
                                </div>
                            </div>
                            {selectedStepID === s.ID &&
                                <div onClick={() => setSelectedStepID(s.ID === selectedStepID ? "" : s.ID)}
                                >
                                    <div className={"fst-italic fw-light text-muted p-2 ps-4"}>Öncül İşlemler</div>
                                    <ul>
                                        {s.parents.map((sp, i) =>
                                            <li className={"fst-italic fw-light text-muted"} key={i}>
                                                {sp.flowName}
                                            </li>)}
                                    </ul>
                                </div>


                            }

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
                </div>

                }
                <div>

                </div>

            </div>)}


        </div>);
}

export default Workflows;
