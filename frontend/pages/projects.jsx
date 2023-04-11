// import Router from "next/router";
import { Card, Text, Link } from "@nextui-org/react";
import { useAuth } from "@contexts/authUserContext";
import { useEffect, useState } from "react";
// import Link from 'next/link';

// import { useAuth } from "@contexts/authUserContext";
import Header from "@components/Header";
import Footer from "@components/Footer";
import styles from "@styles/Dashboard.module.css";

export default function Projects() {

    const [projectData, setProjectData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const auth = useAuth();
    useEffect(() => {
        // if (!auth.authUser) {
        //     // Router.push("/");
        // } else {
        setLoading(true);
        try {
            let data = [
                {
                    ProjectID: 1,
                    ProjectName: "Stephanie's Project",
                    Description: "This is a test project!",
                    OwnerID: 123,
                    SalesTeam: [],
                    ConstructionTeam: [],
                    ProjectClass: "Installation",
                    CurrentStage: 2,
                    NumberOfStages: 5,
                    Tasks: []
                },
                {
                    ProjectID: 2,
                    ProjectName: "Ella's Project",
                    Description: "This is a test project!",
                    OwnerID: 456,
                    SalesTeam: [],
                    ConstructionTeam: [],
                    ProjectClass: "Installation",
                    CurrentStage: 2,
                    NumberOfStages: 5,
                    Tasks: []
                }
            ]
            // let { data, status } = await ax.get(`http://localhost:4000/api/characters/page/${page}`)
            setProjectData(data);
            setLoading(false);
        } catch (e) {
            setError(true)
        }
            // }
    }, [auth]);

    const BuildProjectCard = (project) => {
        return(
            <li>
                <Link href={`/project/${project.ProjectID}`}>
                    <Card
                    isPressable
                    isHoverable
                    variant="bordered">
                        
                            <Card.Header>
                                <Text> {project.ProjectName} </Text>
                            </Card.Header>
                            <Card.Body>
                                <Text> {project.Description} </Text>
                            </Card.Body>
                        
                    </Card>
                </Link>
            </li>
        )
    }

    if (error) {

    } else if (loading) {

    } else {

        let cardElements = null;
        console.log(projectData)
        if (projectData) {
            console.log(projectData)
            cardElements = projectData.map( (proj) => {
                return BuildProjectCard(proj);
            })
            return (
                <div>
                    <h1> All Projects </h1>

                    <ul>
                        {cardElements}
                    </ul>
                </div>
            )
        }
    }
}