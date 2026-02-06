import React from 'react';

export function Gallery() {
    return (
        <main className="flex-grow-1">
            <section>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-lg-4">

                            <article>
                                <div>
                                    <p><strong>@username</strong></p>
                                    <p>I finally completed my first project, a hotdog maker! I used a smart fridge and a GPU
                                        to make it
                                        work with custom RGB.</p>
                                    <a
                                        href="https://media.istockphoto.com/id/1282514444/photo/cow-udder-large-and-full-and-with-horns-in-the-green-pasture-and-a-blue-sky.jpg?s=612x612&w=0&k=20&c=a2TuO1u4H4wKW7aSizBh7Df8CLA70MEPTcadLfc35bk=">MockLinkToPhoto</a>
                                    <p>^^^ Placeholder for content to be fetched from the database</p>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}