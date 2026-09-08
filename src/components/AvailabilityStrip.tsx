import { motion } from "framer-motion";
import { MapPin, Briefcase, Clock } from "lucide-react";

const AvailabilityStrip = () => {
  return (
    <section aria-label="Availability" className="relative -mt-6 z-10">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-border bg-card/80 backdrop-blur-md shadow-sm px-5 py-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm"
        >
          <span className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
            </span>
            <span className="font-medium text-foreground">Open to opportunities</span>
          </span>
          <span className="hidden sm:inline text-border">|</span>
          <span className="flex items-center gap-2 text-muted-foreground">
            <Briefcase size={14} className="text-primary" />
            Data Analyst · Application Engineer · ML Engineer
          </span>
          <span className="hidden sm:inline text-border">|</span>
          <span className="flex items-center gap-2 text-muted-foreground">
            <MapPin size={14} className="text-primary" />
            Batangas City, PH · Remote
          </span>
          <span className="hidden sm:inline text-border">|</span>
          <span className="flex items-center gap-2 text-muted-foreground">
            <Clock size={14} className="text-primary" />
            Replies within 24h
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default AvailabilityStrip;
