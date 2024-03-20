import { useEffect } from "react";
import { Link } from "wouter";
import { databases } from "@/lib/appwrite";

import Layout from "@/components/Layout";
import Container from "@/components/Container";
import EventCard from "@/components/EventCard";

import events from "@/data/events.json";

function Home() {
  useEffect(() => {
    (async function run() {
      const results = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_EVENTS_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_EVENTS_COLLECTION_ID,
      );
      console.log("results", results);
    })();
  }, []);

  return (
    <Layout>
      {Array.isArray(events) && events.length > 0 && (
        <>
          <Container className="flex justify-between items-center mb-10">
            <h1 className="text-lg font-bold uppercase text-slate-600 dark:text-slate-200">
              Upcoming Events
            </h1>
            <p>
              <Link href="/events/new">
                <a className="inline-block rounded bg-slate-600 py-1.5 px-4 text-xs font-bold uppercase text-white hover:bg-slate-500 hover:text-white">
                  Add Event
                </a>
              </Link>
            </p>
          </Container>

          <Container>
            <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => {
                return (
                  <Link key={event.name} href="/event/1234">
                    <a>
                      <EventCard
                        date={event.date}
                        image={{
                          alt: "",
                          height: event.imageHeight,
                          url: event.imageUrl,
                          width: event.imageWidth,
                        }}
                        location={event.location}
                        name={event.name}
                      />
                    </a>
                  </Link>
                );
              })}
            </div>
          </Container>
        </>
      )}
      {Array.isArray(events) && events.length === 0 && (
        <Container>
          <p className="w-100 text-center mb-5">
            No events currently scheduled.
          </p>
          <p className="w-100 text-center">
            <Link href="/events/new">
              <a>Add an Event</a>
            </Link>
          </p>
        </Container>
      )}
    </Layout>
  );
}

export default Home;
