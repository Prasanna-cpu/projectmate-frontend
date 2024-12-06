import {Card, CardContent} from "@/components/ui/card.jsx";
import {Button} from "@/components/ui/button.jsx";
import {MagnifyingGlassIcon, MixerHorizontalIcon} from "@radix-ui/react-icons";
import {ScrollArea} from "@/components/ui/scroll-area.jsx";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {useEffect, useState} from "react";
import ProjectCard from "@/pages/ProjectCard.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchProjects, searchProjects} from "@/redux/Project/Action.js";
import {useLocation, useNavigate} from "react-router-dom";
import {tags} from "../lib/Tags.js"

const ProjectList = () => {
    const dispatch = useDispatch();

    const [keyword, setKeyword] = useState("");

    const {project, auth} = useSelector(store => store);

    const navigate = useNavigate();

    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);

    const category = searchParams.get("category");
    const tag = searchParams.get("tag");

    useEffect(() => {
        dispatch(fetchProjects({
            category: category ,
            tag: tag
        }));
    }, [category, tag, auth?.jwt]);

    function handleFilterChange(section, value) {
        if (value === "all") {
            searchParams.delete(section);
        } else {
            searchParams.set(section, value);
        }
        const query = searchParams.toString();
        navigate({search: query ? `?${query}` : ""});
    }

    function handleSearchChange(e) {
        const searchValue = e.target.value;
        setKeyword(searchValue);
        if (searchValue) {
            dispatch(searchProjects(searchValue));
        }
    }

    return (
        <div>
            <div className={"relative px-5 lg:px-0 lg:flex gap-5 justify-center py-5"}>
                {/* Filter Section */}
                <section className={"filterSection"}>
                    <Card className={"p-5 sticky top-10"}>
                        <div className={"flex justify-between lg:w-[20rem]"}>
                            <p className={"text-xl -tracking-wider"}>Filters</p>
                            <Button variant={"ghost"} size={"icon"}>
                                <MixerHorizontalIcon/>
                            </Button>
                        </div>
                        <CardContent>
                            <ScrollArea className={"space-y-7 h-[80vh]"}>
                                {/* Category Filters */}
                                <div>
                                    <h1 className={"pb-3 text-gray-400 border-b"}>Category</h1>
                                    <div className={"pt-5 gap-9 flex flex-col"}>
                                        <RadioGroup
                                            onValueChange={(value) => handleFilterChange("category", value)}
                                            defaultValue={category || "all"}
                                            className={"space-y-3"}
                                        >
                                            <div className={"flex items-center gap-2"}>
                                                <RadioGroupItem value={"all"} id={"category-all"}/>
                                                <Label htmlFor={"category-all"}>all</Label>
                                            </div>
                                            <div className={"flex items-center gap-2"}>
                                                <RadioGroupItem value={"fullstack"} id={"category-fullstack"}/>
                                                <Label htmlFor={"category-fullstack"}>fullstack</Label>
                                            </div>
                                            <div className={"flex items-center gap-2"}>
                                                <RadioGroupItem value={"frontend"} id={"category-frontend"}/>
                                                <Label htmlFor={"category-frontend"}>frontend</Label>
                                            </div>
                                            <div className={"flex items-center gap-2"}>
                                                <RadioGroupItem value={"backend"} id={"category-backend"}/>
                                                <Label htmlFor={"category-backend"}>backend</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                </div>

                                {/* Tag Filters */}
                                <div className={"pt-9"}>
                                    <h1 className={"pb-3 text-gray-400 border-b"}>Tags</h1>
                                    <div className={"pt-5 gap-9 flex flex-col"}>
                                        <RadioGroup
                                            onValueChange={(value) => handleFilterChange("tag", value)}
                                            defaultValue={tag || "all"}
                                            className={"space-y-3"}
                                        >
                                            {tags.map((item) => (
                                                <div className={"flex items-center gap-2"} key={item}>
                                                    <RadioGroupItem value={item} id={`tag-${item}`}/>
                                                    <Label htmlFor={`tag-${item}`}>{item}</Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    </div>
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </section>

                {/* Project List Section */}
                <section className={"projectListSection w-full lg:w-[48rem]"}>
                    <div className={"flex gap-2 items-center pb-5 justify-between"}>
                        <div className={"relative p-0 w-full"}>
                            <Input
                                className={"40% px-9"}
                                onChange={handleSearchChange}
                                placeholder={"Search project"}
                            />
                            <MagnifyingGlassIcon className={"absolute top-3 left-4"}/>
                        </div>
                    </div>
                    <div>
                        <div className={"space-y-5 min-h-[74vh]"}>
                            {keyword ? (
                                project.searchProjects?.data?.map((item) => (
                                    <ProjectCard data={item} key={item.id}/>
                                ))
                            ) : (
                                project?.projects?.data?.map((item) => (
                                    <ProjectCard data={item} key={item.id}/>
                                ))
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ProjectList;
